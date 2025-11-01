import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card, Modal, Alert } from "react-bootstrap";
import { FaGift, FaPaperPlane, FaCalendarAlt, FaWhatsapp } from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const GiftCardPage = () => {
  const [giftAmount, setGiftAmount] = useState("");
  const [recipient, setRecipient] = useState({ name: "", email: "", phone: "" });
  const [message, setMessage] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [design, setDesign] = useState("birthday");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const predefinedAmounts = [500, 1000, 2000, 5000];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!giftAmount || !recipient.email) {
      setShowAlert(true);
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirmSend = () => {
    const giftCardData = {
      amount: giftAmount,
      recipient,
      message,
      deliveryDate,
      design,
      createdAt: new Date(),
    };
    localStorage.setItem("giftCard", JSON.stringify(giftCardData));
    setShowConfirm(false);
    alert("Gift Card scheduled/sent successfully!");
    // Reset
    setGiftAmount("");
    setRecipient({ name: "", email: "", phone: "" });
    setMessage("");
    setDeliveryDate("");
    setDesign("birthday");
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="text-center mb-4 text-primary">
          <FaGift className="me-2" />
          Send a Digital Gift Card
        </h2>

        {showAlert && (
          <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
            Please enter the amount and recipient email.
          </Alert>
        )}

        <Card className="p-4 shadow-sm">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Gift Card Amount</Form.Label>
                <div className="d-flex flex-wrap gap-2 mb-2">
                  {predefinedAmounts.map((amt) => (
                    <Button
                      key={amt}
                      variant={giftAmount == amt ? "primary" : "outline-primary"}
                      onClick={() => setGiftAmount(amt)}
                    >
                      ₹{amt}
                    </Button>
                  ))}
                </div>
                <Form.Control
                  type="number"
                  placeholder="Or enter custom amount"
                  value={giftAmount}
                  onChange={(e) => setGiftAmount(e.target.value)}
                />
              </Col>

              <Col md={6}>
                <Form.Label>Choose a Card Design</Form.Label>
                <Form.Select
                  value={design}
                  onChange={(e) => setDesign(e.target.value)}
                >
                  <option value="birthday">🎂 Birthday</option>
                  <option value="festival">🎉 Festival</option>
                  <option value="thankyou">🙏 Thank You</option>
                  <option value="custom">✨ Custom</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Label>Recipient Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={recipient.name}
                  onChange={(e) => setRecipient({ ...recipient, name: e.target.value })}
                />
              </Col>
              <Col md={4}>
                <Form.Label>Recipient Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={recipient.email}
                  onChange={(e) => setRecipient({ ...recipient, email: e.target.value })}
                />
              </Col>
              <Col md={4}>
                <Form.Label>Recipient Phone (for WhatsApp)</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Optional"
                  value={recipient.phone}
                  onChange={(e) => setRecipient({ ...recipient, phone: e.target.value })}
                />
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Personal Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Add a personal note..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Label>
                  <FaCalendarAlt className="me-2" />
                  Schedule Delivery
                </Form.Label>
                <Form.Control
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                />
                <Form.Text muted>Leave empty for immediate delivery.</Form.Text>
              </Col>
            </Row>

            <Button variant="success" type="submit" className="w-100 fw-bold">
              <FaPaperPlane className="me-2" />
              Send Gift Card
            </Button>
          </Form>
        </Card>
      </div>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm & Send</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to send this gift card to{" "}
          <strong>{recipient.name || "Recipient"}</strong> for ₹{giftAmount}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmSend}>
            Confirm & Send
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default GiftCardPage;
