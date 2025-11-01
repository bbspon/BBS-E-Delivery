import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion, Form, Button, InputGroup } from "react-bootstrap";
import {
  FaSearch,
  FaThumbsUp,
  FaThumbsDown,
  FaHeadset,
  FaMapMarkedAlt,
  FaClock,
  FaTruck,
  FaUndo,
} from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const deliveryData = [
  {
    icon: <FaMapMarkedAlt className="me-2 text-success" />,
    category: "Delivery Zones & Coverage",
    questions: [
      {
        q: "Which locations do you deliver to?",
        a: "We currently deliver to all major cities and selected rural areas. Use your PIN code at checkout to confirm availability.",
      },
      {
        q: "Are remote or island locations supported?",
        a: "Delivery to remote areas may take longer or may not be supported. You will be notified during checkout.",
      },
    ],
  },
  {
    icon: <FaClock className="me-2 text-warning" />,
    category: "Delivery Timings & Slots",
    questions: [
      {
        q: "What are your delivery timings?",
        a: "Deliveries are made between 9 AM to 8 PM. You can choose time slots in eligible locations.",
      },
      {
        q: "Can I select a preferred delivery date?",
        a: "Yes, at checkout, you can select a preferred delivery date depending on availability.",
      },
    ],
  },
  {
    icon: <FaTruck className="me-2 text-primary" />,
    category: "Delivery Charges & Fees",
    questions: [
      {
        q: "Is delivery free?",
        a: "Delivery is free for orders above ₹499. A nominal fee of ₹49 applies for smaller orders.",
      },
      {
        q: "Is there extra charge for same-day delivery?",
        a: "Same-day or express delivery has additional charges based on location and item weight.",
      },
    ],
  },
  {
    icon: <FaUndo className="me-2 text-danger" />,
    category: "Failed / Missed Deliveries",
    questions: [
      {
        q: "What happens if I'm not available during delivery?",
        a: "We’ll attempt redelivery the next day. You can also reschedule via My Orders > Reschedule.",
      },
      {
        q: "How do I reschedule my delivery?",
        a: "Log in to your account, go to My Orders, and select the Reschedule option if your order supports it.",
      },
    ],
  },
];

const HelpCenterPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [feedback, setFeedback] = useState({});

  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredData = deliveryData.map((category) => ({
    ...category,
    questions: category.questions.filter((item) =>
      item.q.toLowerCase().includes(searchTerm) || item.a.toLowerCase().includes(searchTerm)
    ),
  }));

  const toggleFeedback = (question, isHelpful) => {
    setFeedback((prev) => ({ ...prev, [question]: isHelpful }));
  };

  return (
    <>
      <Header />
      <div className="container my-5 border p-5 shadow-sm rounded">
        <h2 className="mb-4 text-center text-warning fw-bold">
          Delivery Information & Policies
        </h2>

        {/* Search Bar */}
        <InputGroup className="mb-4 shadow-sm">
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search delivery topics..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </InputGroup>

        {/* Delivery Info Accordion */}
        {filteredData.map((category, catIndex) => (
          <div key={catIndex} className="mb-4">
            <h5 className="text-primary mb-2 d-flex align-items-center">
              {category.icon} {category.category}
            </h5>
            <Accordion>
              {category.questions.map((item, index) => (
                <Accordion.Item key={index} eventKey={`${catIndex}-${index}`}>
                  <Accordion.Header>{item.q}</Accordion.Header>
                  <Accordion.Body>
                    <p>{item.a}</p>
                    <div className="d-flex align-items-center gap-3 mt-2">
                      <span>Was this helpful?</span>
                      <Button
                        size="sm"
                        variant={feedback[item.q] === true ? "success" : "outline-success"}
                        onClick={() => toggleFeedback(item.q, true)}
                      >
                        <FaThumbsUp />
                      </Button>
                      <Button
                        size="sm"
                        variant={feedback[item.q] === false ? "danger" : "outline-danger"}
                        onClick={() => toggleFeedback(item.q, false)}
                      >
                        <FaThumbsDown />
                      </Button>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        ))}

        {/* Escalation Section */}
        <div className="mt-5 p-4 border rounded bg-light shadow-sm">
          <h5 className="mb-3">
            <FaHeadset className="me-2" />
            Still Have Delivery Questions?
          </h5>
          <p>If your delivery concern isn't addressed above, our support team is happy to assist you further.</p>
          <Button variant="warning" href="/contact" className="fw-bold px-4">
            Contact Support
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HelpCenterPage;
