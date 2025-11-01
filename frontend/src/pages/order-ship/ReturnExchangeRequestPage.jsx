import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Spinner,
  Modal
} from "react-bootstrap";
import {
  FaUndoAlt,
  FaExchangeAlt,
  FaEdit,
  FaUpload,
  FaRobot,
  FaTimesCircle
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { TbTruckReturn } from "react-icons/tb";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
const ReturnExchangeRequestPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [actionType, setActionType] = useState("return");
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [refundMethod, setRefundMethod] = useState("wallet");
  const [exchangeVariant, setExchangeVariant] = useState("");
  const [pickupLocation, setPickupLocation] = useState("Home Address #1");
  const [pickupPincode, setPickupPincode] = useState("600001");
  const [pickupMethod, setPickupMethod] = useState("pickup");
  const [submitted, setSubmitted] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [showAIModal, setShowAIModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOrders([
        {
          id: "ORD123456",
          items: [
            {
              name: "Running Shoes",
              sku: "SHOE123",
              variant: "Size 9 / Black",
              policy: "7-day returnable",
              image: "https://th.bing.com/th/id/R.588c91bfba1ed32b8b0ae41dc7fb7c4d?rik=2cAi1QHrzWsBpQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fshoes-png--1200.png&ehk=LDK2zKZ4gGD3lYE7ncWJOb8tGdJLrU046BiOz1wqbAQ%3d&risl=&pid=ImgRaw&r=0"
            },
            {
              name: "Bluetooth Headphones",
              sku: "HEAD456",
              variant: "Black",
              policy: "No return",
              image: "https://pngimg.com/uploads/headphones/headphones_PNG7658.png"
            }
          ]
        }
      ]);
    }, 1000);
  }, []);

  const toggleProductSelection = (item) => {
    const exists = selectedProducts.find((p) => p.sku === item.sku);
    if (exists) {
      setSelectedProducts(selectedProducts.filter((p) => p.sku !== item.sku));
    } else {
      setSelectedProducts([...selectedProducts, item]);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
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
    if (selectedProducts.length === 0) {
      setAiSuggestion("❗Please select at least one product to get AI help.");
      setShowAIModal(true);
      return;
    }

    let suggestion = "🤖 Here's what I suggest based on your selection:\n\n";

    selectedProducts.forEach((product, index) => {
      suggestion += `📦 *${product.name}* (${product.variant})\n`;

      if (product.policy.toLowerCase().includes("no return")) {
        suggestion += "⚠️ This product is marked as non-returnable.\n";
      } else {
        if (reason.toLowerCase().includes("damaged")) {
          suggestion += "✅ Suggest refund with image proof.\n";
        } else if (reason.toLowerCase().includes("wrong size")) {
          suggestion += "✅ Suggest exchange to a more suitable size. e.g., try Size 10.\n";
        } else if (reason.toLowerCase().includes("wrong product")) {
          suggestion += "✅ Suggest replacement with the correct item.\n";
        } else {
          suggestion += "✅ Suggest standard return or refund process.\n";
        }
      }

      suggestion += "\n";
    });

    suggestion += `📍 Pickup Address Suggestion: "${pickupLocation}, ${pickupPincode}"\n`;
    suggestion += `💰 Refund via: ${actionType === "return" ? refundMethod : "N/A"}\n`;

    if (actionType === "exchange" && !exchangeVariant) {
      suggestion += "📌 Consider entering an exchange variant (e.g., Size 10 / Blue).\n";
    }

    suggestion += "\n⚡ To auto-fill this form with AI, enable Smart Autofill (coming soon).";

    setAiSuggestion(suggestion);
    setShowAIModal(true);
  };

  return (
    <>
    <Header/>
     <div className="container fluid my-4 border pt-5 shadow-sm rounded h-100">
      <h2 className="text-center fw-bold mb-4 d-flex align-items-center justify-content-center gap-3">
        <TbTruckReturn className="me-2 text-danger" size={50}/>Return & Exchange Request
      </h2>

      {orders.length === 0 ? (
        <Spinner animation="border" variant="primary" />
      ) : submitted ? (
        <Alert variant="success">
          ✅ Your request has been submitted successfully. Request ID: REQ987654.
        </Alert>
      ) : (
        <Card className="p-4 ">
          <Form>
            {/* Order Selection */}
            <Form.Group className="mb-3">
              <Form.Label>Select Order</Form.Label>
              <Form.Select
                onChange={(e) =>
                  setSelectedOrder(
                    orders.find((o) => o.id === e.target.value)
                  )
                }
              >
                <option>Select an order</option>
                {orders.map((order) => (
                  <option key={order.id} value={order.id}>
                    {order.id}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Product Selection */}
            {selectedOrder && (
              <Form.Group className="mb-3">
                <Form.Label>Select Product(s)</Form.Label>
                <Row>
                  {selectedOrder.items.map((item, index) => (
                    <Col key={index} md={6} className="mb-3">
                      <Card
                        className={`p-2 cursor-pointer  ${
                          selectedProducts.find((p) => p.sku === item.sku)
                            ? "border-primary border-2"
                            : ""
                        }`}
                        onClick={() => toggleProductSelection(item)}
                      >
                        <Row>
                          <Col xs={3}>
                            <img src={item.image} alt="img" width="100" height="80" />
                          </Col>
                          <Col>
                            <div className="fw-bold">{item.name}</div>
                            <div className="text-muted small">{item.variant}</div>
                            <div className="text-success small">{item.policy}</div>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Form.Group>
            )}

            {/* Form for selected products */}
            {selectedProducts.length > 0 && (
              <>
                <Form.Group className="mb-3 d-flex  gap-3">
                  <Form.Label>Action Type</Form.Label>
                  <Form.Check
                    inline
                    label="Return"
                    name="actionType"
                    type="radio"
                    checked={actionType === "return"}
                    onChange={() => setActionType("return")}
                  />
                  <Form.Check
                    inline
                    label="Exchange"
                    name="actionType"
                    type="radio"
                    checked={actionType === "exchange"}
                    onChange={() => setActionType("exchange")}
                  />
                  <Form.Check
                    inline
                    label="Modify Order"
                    name="actionType"
                    type="radio"
                    checked={actionType === "modify"}
                    onChange={() => setActionType("modify")}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Reason</Form.Label>
                  <Form.Select onChange={(e) => setReason(e.target.value)}>
                    <option>Select a reason</option>
                    <option>Wrong size</option>
                    <option>Damaged item</option>
                    <option>Received wrong product</option>
                    <option>Not as described</option>
                    <option>Other</option>
                  </Form.Select>
                  {reason === "Other" && (
                    <Form.Control
                      className="mt-2"
                      placeholder="Enter your reason"
                      value={otherReason}
                      onChange={(e) => setOtherReason(e.target.value)}
                    />
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Upload Images</Form.Label>
                  <Form.Control type="file" multiple onChange={handleImageUpload} />
                  <Row className="my-4 g-2 border p-2 rounded">
                    {uploadedImages.map((img, i) => (
                      <Col key={i} xs={3} className="position-relative p-2 my-3 mx-3">
                        <img 
                          width="200" height="250" 
                          src={URL.createObjectURL(img)}
                          alt="upload"
                          className="img-thumbnail  rounded "
                        />
                        <FaTimesCircle
                          className="text-danger position-absolute top-0 end-0 m-1"
                          role="button"
                          onClick={() => removeImage(i)}
                        />
                      </Col>
                    ))}
                  </Row>
                </Form.Group>

                {actionType === "exchange" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Select Exchange Variant</Form.Label>
                    <Form.Control
                      placeholder="e.g., Size 10 / Red"
                      value={exchangeVariant}
                      onChange={(e) => setExchangeVariant(e.target.value)}
                    />
                  </Form.Group>
                )}

                {actionType === "return" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Refund Method</Form.Label>
                    <Form.Select
                      value={refundMethod}
                      onChange={(e) => setRefundMethod(e.target.value)}
                    >
                      <option value="wallet">Refund to Wallet</option>
                      <option value="original">Original Payment Method</option>
                    </Form.Select>
                  </Form.Group>
                )}

                <Form.Group className="mb-3 d-flex gap-3">
                  <Form.Label>Pickup Method</Form.Label>
                  <Form.Check
                    inline
                    label="Pickup from Address"
                    type="radio"
                    checked={pickupMethod === "pickup"}
                    onChange={() => setPickupMethod("pickup")}
                  />
                  <Form.Check
                    inline
                    label="Manual Drop-off"
                    type="radio"
                    checked={pickupMethod === "drop"}
                    onChange={() => setPickupMethod("drop")}
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Pickup Location</Form.Label>
                      <Form.Control
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control
                        value={pickupPincode}
                        onChange={(e) => setPickupPincode(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-between mt-4">
                  <Button variant="primary" onClick={handleSubmit}>
                    Submit Request
                  </Button>
                  <Button variant="outline-secondary" onClick={generateAISuggestion}>
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
        <Modal.Body style={{ whiteSpace: "pre-wrap" }}>{aiSuggestion}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowAIModal(false)}>
            Got it
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    <Footer/>
    </>
  );
};

export default ReturnExchangeRequestPage;
