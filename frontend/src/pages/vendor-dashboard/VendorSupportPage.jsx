import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Badge,
  Card,
  Modal,
} from "react-bootstrap";
import {
  FaUpload,
  FaPaperPlane,
  FaStar,
  FaExclamationCircle,
} from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const mockTickets = [
  {
    id: "TKT-1001",
    subject: "Payout not received",
    priority: "High",
    category: "Payout",
    status: "Open",
    createdAt: "2025-07-01",
    messages: [
      {
        sender: "Vendor",
        text: "Payment delayed for June",
        time: "2025-07-01 10:45",
      },
      {
        sender: "Admin",
        text: "We'll check and get back",
        time: "2025-07-01 11:30",
      },
    ],
  },
  {
    id: "TKT-1002",
    subject: "Order blocked unfairly",
    priority: "Medium",
    category: "Order Issue",
    status: "Resolved",
    createdAt: "2025-06-25",
    messages: [
      {
        sender: "Vendor",
        text: "Please review order block",
        time: "2025-06-25 09:00",
      },
      { sender: "Admin", text: "Issue resolved", time: "2025-06-26 12:00" },
    ],
  },
];

const VendorSupportPage = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: "",
    category: "",
    priority: "Low",
    description: "",
    attachment: null,
  });

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const updated = tickets.map((ticket) =>
      ticket.id === selectedTicket.id
        ? {
            ...ticket,
            messages: [
              ...ticket.messages,
              {
                sender: "Vendor",
                text: newMessage,
                time: new Date().toLocaleString(),
              },
            ],
          }
        : ticket
    );
    setTickets(updated);
    setNewMessage("");
    setShowSuccessMsg(true);

    setTimeout(() => {
      setShowSuccessMsg(false);
    }, 2000);
  };

  const handleCreateTicket = () => {
    const newId = `TKT-${Math.floor(Math.random() * 10000)}`;
    const ticket = {
      id: newId,
      subject: newTicket.subject,
      category: newTicket.category,
      priority: newTicket.priority,
      status: "Open",
      createdAt: new Date().toISOString().split("T")[0],
      messages: [
        {
          sender: "Vendor",
          text: newTicket.description,
          time: new Date().toLocaleString(),
        },
      ],
    };
    setTickets([ticket, ...tickets]);
    setShowNewTicketModal(false);
    setNewTicket({
      subject: "",
      category: "",
      priority: "Low",
      description: "",
      attachment: null,
    });
  };

  return (
    <>
      <Container className=" border p-5 shadow-sm rounded ">
        <h3 className="mb-3 text-warning fw-bold border-bottom pb-2 d-flex align-items-center gap-2 justify-content-between">
          Vendor Support & Dispute Resolution{" "}
          <GiCancel
            className="text-danger fs-4 cursor-pointer"
            title="Go to Home"
            onClick={() => navigate("/")}
          />
        </h3>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold">Your Support Tickets</h5>
          <Button variant="warning" onClick={() => setShowNewTicketModal(true)}>
            + Raise New Ticket
          </Button>
        </div>

        <Row>
          <Col md={4}>
            <Card className="mb-3">
              <Card.Body>
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="border-bottom py-2 cursor-pointer"
                    onClick={() => setSelectedTicket(ticket)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex justify-content-between">
                      <div>
                        <strong>{ticket.subject}</strong>
                        <div className="text-muted small">
                          {ticket.createdAt}
                        </div>
                      </div>
                      <Badge
                        bg={ticket.status === "Resolved" ? "success" : "info"}
                      >
                        {ticket.status}
                      </Badge>
                    </div>
                    <div className="small text-muted">
                      Priority:{" "}
                      <span className="text-capitalize">{ticket.priority}</span>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            {selectedTicket ? (
              <Card>
                <Card.Header>
                  <strong>{selectedTicket.subject}</strong>{" "}
                  <Badge bg="secondary" className="ms-2">
                    {selectedTicket.category}
                  </Badge>{" "}
                  <Badge bg="light text-dark" className="ms-2">
                    {selectedTicket.priority}
                  </Badge>
                </Card.Header>
                <Card.Body style={{ maxHeight: "350px", overflowY: "auto" }}>
                  {selectedTicket.messages.map((msg, idx) => (
                    <div key={idx} className="mb-2">
                      <div className="fw-bold">{msg.sender}</div>
                      <div>{msg.text}</div>
                      <div className="text-muted small">{msg.time}</div>
                    </div>
                  ))}
                </Card.Body>
                <Card.Footer>
                  <Form.Control
                    placeholder="Type your reply here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  {showSuccessMsg && (
                    <div className="alert alert-success mt-2 py-2 px-3">
                      Message sent successfully!
                    </div>
                  )}
                  <Button
                    className="mt-2"
                    variant="primary"
                    onClick={handleSendMessage}
                  >
                    <FaPaperPlane /> Send
                  </Button>
                </Card.Footer>
              </Card>
            ) : (
              <Card className="text-center py-5">
                <Card.Body>
                  <FaExclamationCircle size={40} className="text-muted mb-3" />
                  <div className="text-muted">
                    Select a ticket to view conversation
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>

        {/* New Ticket Modal */}
        <Modal
          show={showNewTicketModal}
          onHide={() => setShowNewTicketModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create New Ticket</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  value={newTicket.subject}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, subject: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={newTicket.category}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, category: e.target.value })
                  }
                >
                  <option>Select Category</option>
                  <option>Order Issue</option>
                  <option>Payout</option>
                  <option>Product Block</option>
                  <option>Account/Verification</option>
                  <option>Others</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                  value={newTicket.priority}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, priority: e.target.value })
                  }
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={newTicket.description}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, description: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Attachment</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowNewTicketModal(false)}
            >
              Cancel
            </Button>
            <Button variant="success" onClick={handleCreateTicket}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default VendorSupportPage;
