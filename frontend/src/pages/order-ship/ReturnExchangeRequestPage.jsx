import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Spinner,
  Modal,
  InputGroup,
} from "react-bootstrap";
import {
  FaUndoAlt,
  FaExchangeAlt,
  FaEdit,
  FaUpload,
  FaRobot,
  FaTimesCircle,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { TbTruckReturn } from "react-icons/tb";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const API_BASE =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_BASE_PROD
    : import.meta.env.VITE_API_BASE;




export default function ReturnExchangeRequestPage() {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRma, setSelectedRma] = useState("");
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState("");
  const [proofUrl, setProofUrl] = useState("");
  const [info, setInfo] = useState({ type: "", msg: "" });

  // legacy UI states kept (used in AI modal, etc.)
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [actionType, setActionType] = useState("return");
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [refundMethod, setRefundMethod] = useState("wallet");
  const [exchangeVariant, setExchangeVariant] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupPincode, setPickupPincode] = useState("");
  const [pickupMethod, setPickupMethod] = useState("pickup");
  const [submitted, setSubmitted] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [showAIModal, setShowAIModal] = useState(false);

  // Load live returns from E-Delivery (created by BBSCART)
  async function loadReturns() {
    try {
      setLoading(true);
      const r = await fetch(`${API_BASE}/api/assigned-orders/v1/returns`);
      const j = await r.json();
      if (j.ok) {
        setReturns(j.items || []);
        // auto select first
        if ((j.items || []).length > 0) {
          setSelectedRma(j.items[0].rmaId);
          setSelectedReturn(j.items[0]);
          setPickupLocation(j.items[0]?.pickupAddress?.line1 || "");
          setPickupPincode(j.items[0]?.pickupAddress?.pincode || "");
        }
      } else {
        setInfo({ type: "danger", msg: j.error || "Failed to load returns" });
      }
    } catch (e) {
      setInfo({ type: "danger", msg: e.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReturns();
  }, []);

  function onSelectRma(rmaId) {
    setSelectedRma(rmaId);
    const found = returns.find((x) => x.rmaId === rmaId) || null;
    setSelectedReturn(found);
    if (found) {
      setPickupLocation(found?.pickupAddress?.line1 || "");
      setPickupPincode(found?.pickupAddress?.pincode || "");
    }
  }

  async function submitStatusUpdate() {
    if (!selectedReturn || !statusUpdate) {
      setInfo({
        type: "warning",
        msg: "Choose a return and a status to update.",
      });
      return;
    }
    try {
      const r = await fetch(
        `${API_BASE}/api/assigned-orders/v1/returns/${selectedReturn.rmaId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: statusUpdate, note: "Ops update" }),
        }
      );
      const j = await r.json();
      if (j.ok) {
        setInfo({ type: "success", msg: `Status updated to ${statusUpdate}` });
        await loadReturns();
      } else {
        setInfo({ type: "danger", msg: j.error || "Failed to update status" });
      }
    } catch (e) {
      setInfo({ type: "danger", msg: e.message });
    }
  }

  async function submitProof() {
    if (!selectedReturn || !proofUrl) {
      setInfo({ type: "warning", msg: "Provide a proof URL to upload." });
      return;
    }
    try {
      const r = await fetch(
        `${API_BASE}/api/assigned-orders/v1/returns/${selectedReturn.rmaId}/proofs`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            proofs: [{ type: "PICKUP_PROOF", url: proofUrl }],
          }),
        }
      );
      const j = await r.json();
      if (j.ok) {
        setInfo({ type: "success", msg: "Proof added." });
        setProofUrl("");
        await loadReturns();
      } else {
        setInfo({ type: "danger", msg: j.error || "Failed to add proof" });
      }
    } catch (e) {
      setInfo({ type: "danger", msg: e.message });
    }
  }

  const toggleProductSelection = (item) => {
    const exists = selectedProducts.find((p) => p.sku === item.sku);
    if (exists) {
      setSelectedProducts(selectedProducts.filter((p) => p.sku !== item.sku));
    } else {
      setSelectedProducts([...selectedProducts, item]);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    const updated = [...uploadedImages];
    updated.splice(index, 1);
    setUploadedImages(updated);
  };

  const generateAISuggestion = () => {
    if (!selectedReturn) {
      setAiSuggestion("❗Select a return to get AI help.");
      setShowAIModal(true);
      return;
    }

    let suggestion = "🤖 Recommendation for this reverse pickup:\n\n";
    suggestion += `RMA: ${selectedReturn.rmaId}\n`;
    suggestion += `Order: ${
      selectedReturn.originalOrderId || selectedReturn.orderIdMasked || "-"
    }\n`;
    suggestion += `Pincode: ${selectedReturn?.pickupAddress?.pincode || "-"}\n`;
    suggestion += `Slot: ${
      selectedReturn?.pickupSlot?.label ||
      `${selectedReturn?.pickupSlot?.start || ""}-${
        selectedReturn?.pickupSlot?.end || ""
      }`
    } (${selectedReturn?.pickupSlot?.date || "-"})\n\n`;

    (selectedReturn.items || []).forEach((it, idx) => {
      suggestion += `#${idx + 1} ${it.title || it.sku} x${it.qty}\n`;
    });

    suggestion += `\nCurrent status: ${selectedReturn.status}\n`;
    suggestion += `✅ If 'PICKUP_SCHEDULED', plan route grouping by pincode & slot.\n`;
    suggestion += `✅ If 'PICKED_UP', add pickup proof now.\n`;
    suggestion += `✅ When 'DELIVERED_TO_VENDOR', trigger wallet refund.\n`;

    setAiSuggestion(suggestion);
    setShowAIModal(true);
  };

  return (
    <>
      <Header />
      <div className="container fluid my-4 border pt-5 shadow-sm rounded h-100">
        <h2 className="text-center fw-bold mb-4 d-flex align-items-center justify-content-center gap-3">
          <TbTruckReturn className="me-2 text-danger" size={50} />
          Return & Exchange Request
        </h2>

        {info.msg && <Alert variant={info.type}>{info.msg}</Alert>}
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <Card className="p-4">
            <Form>
              {/* Select Return (RMA) */}
              <Form.Group className="mb-3">
                <Form.Label>Select Return (RMA)</Form.Label>
                <Form.Select
                  value={selectedRma}
                  onChange={(e) => onSelectRma(e.target.value)}
                >
                  {returns.length === 0 && <option>No returns</option>}
                  {returns.map((r) => (
                    <option key={r.rmaId} value={r.rmaId}>
                      {r.rmaId} {r.orderIdMasked ? `(${r.orderIdMasked})` : ""}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Items */}
              {selectedReturn && (
                <Form.Group className="mb-3">
                  <Form.Label>Items</Form.Label>
                  <Row>
                    {(selectedReturn.items || []).map((item, index) => (
                      <Col key={index} md={6} className="mb-3">
                        <Card
                          className={`p-2 cursor-pointer ${
                            selectedProducts.find((p) => p.sku === item.sku)
                              ? "border-primary border-2"
                              : ""
                          }`}
                          onClick={() => toggleProductSelection(item)}
                        >
                          <Row>
                            <Col xs={3}>
                              <img
                                src={
                                  item.image ||
                                  "https://via.placeholder.com/100x80?text=Item"
                                }
                                alt="img"
                                width="100"
                                height="80"
                              />
                            </Col>
                            <Col>
                              <div className="fw-bold">
                                {item.title || item.sku}
                              </div>
                              <div className="text-muted small">
                                Qty: {item.qty}
                              </div>
                              <div className="text-success small">
                                {selectedReturn?.pickupSlot?.label ||
                                  "Scheduled"}
                              </div>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Form.Group>
              )}

              {/* Ops controls */}
              {selectedReturn && (
                <>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Update Status</Form.Label>
                        <Form.Select
                          value={statusUpdate}
                          onChange={(e) => setStatusUpdate(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="PICKUP_SCHEDULED">
                            PICKUP_SCHEDULED
                          </option>
                          <option value="OUT_FOR_PICKUP">OUT_FOR_PICKUP</option>
                          <option value="PICKED_UP">PICKED_UP</option>
                          <option value="IN_TRANSIT">IN_TRANSIT</option>
                          <option value="DELIVERED_TO_VENDOR">
                            DELIVERED_TO_VENDOR
                          </option>
                          <option value="CANCELLED">CANCELLED</option>
                          <option value="FAILED">FAILED</option>
                        </Form.Select>
                        <Button
                          className="mt-2"
                          variant="primary"
                          onClick={submitStatusUpdate}
                        >
                          Update
                        </Button>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Add Proof URL</Form.Label>
                        <InputGroup>
                          <Form.Control
                            placeholder="https://..."
                            value={proofUrl}
                            onChange={(e) => setProofUrl(e.target.value)}
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={submitProof}
                          >
                            <FaUpload className="me-2" />
                            Upload
                          </Button>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-between mt-4">
                    <Button
                      variant="outline-secondary"
                      onClick={generateAISuggestion}
                    >
                      <FaRobot className="me-2" /> Ask AI for Help
                    </Button>
                  </div>
                </>
              )}
            </Form>
          </Card>
        )}

        {/* AI Suggestion Modal */}
        <Modal show={showAIModal} onHide={() => setShowAIModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>AI Recommendation</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ whiteSpace: "pre-wrap" }}>
            {aiSuggestion}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setShowAIModal(false)}>
              Got it
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </>
  );
}
