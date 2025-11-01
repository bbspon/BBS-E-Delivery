import React, { useState, useEffect } from "react";
import { Button, Spinner, Card, Modal, Form } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhone, FaSyncAlt, FaClock, FaTruck, FaUser } from "react-icons/fa";
import { RiEBike2Fill } from "react-icons/ri";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "300px"
};

const center = {
  lat: 12.9352,
  lng: 77.6142
};

const AdvancedOrderTrackingPage = () => {
  const [eta, setEta] = useState("Arriving in 14–22 mins");
  const [agent, setAgent] = useState({
    name: "Ravi Kumar",
    phone: "+91 9876543210",
    vehicle: "Bike - KA05AB1234",
    rating: 4.8,
    deliveries: 186,
    image: "https://i.pravatar.cc/100?img=56",
    location: { lat: 12.9480, lng: 77.6100 }
  });
  const [deliveryOtp] = useState("4291");
  const [instructions, setInstructions] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
    libraries
  });

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = { sender: "You", text: newMessage };
      setChatMessages(prev => [...prev, userMessage]);
      setNewMessage("");

      // Simulate AI assistant response
      setTimeout(() => {
        const aiResponse = generateAIResponse(newMessage);
        setChatMessages(prev => [...prev, { sender: "Agent AI", text: aiResponse }]);
      }, 1000);
    }
  };

  const generateAIResponse = (message) => {
    message = message.toLowerCase();
    if (message.includes("where") && message.includes("order")) {
      return "Your order is currently out for delivery and will arrive within 14–22 minutes.";
    } else if (message.includes("agent") && message.includes("location")) {
      return "The agent is en route and about 2 km away from your address.";
    } else if (message.includes("otp")) {
      return `Your secure delivery OTP is ${deliveryOtp}. Share it only upon receiving the package.`;
    } else {
      return "I'm here to help with your delivery queries. Please wait for a human agent if needed.";
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      // Future: simulate ETA/location updates
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <Spinner animation="border" variant="primary" />;

  return (
 <>
 <Header/>
    <div className="container my-4 border p-5 shadow-sm rounded">
      <h2 className="text-center mb-4 fw-bold text-dark">
        <RiEBike2Fill  className="mb-1" /> Live Delivery Tracking
      </h2>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5 className="fw-semibold">Order ID: #ORD654321</h5>
          <p><FaClock className="text-warning me-2" />Estimated Arrival: <strong>{eta}</strong></p>
          <div className="progress my-3">
            <div className="progress-bar bg-success" style={{ width: "75%" }}>
              Out for Delivery
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5 className="mb-3 fw-semibold">
            <FaMapMarkerAlt className="me-2 text-danger" />
            Live Delivery Location
          </h5>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={14}
            center={center}
          >
            <Marker position={agent.location} label="Agent" />
            <Marker position={center} label="You" />
          </GoogleMap>
          <Button variant="outline-primary" className="mt-3">
            <FaSyncAlt className="me-2" /> Refresh Map
          </Button>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm">
        <Card.Body className="d-flex align-items-center">
          <img src={agent.image} alt="Agent" className="rounded-circle me-3" width="80" height="80" />
          <div>
            <h5 className="mb-1"><FaUser className="me-2" />{agent.name}</h5>
            <p className="mb-0 text-muted">{agent.vehicle}</p>
            <p className="mb-1">Rating: ⭐ {agent.rating} | Deliveries: {agent.deliveries}</p>
            <div className="d-flex gap-2">
              <Button variant="success" href={`tel:${agent.phone}`}>
                <FaPhone className="me-2" /> Call Agent
              </Button>
              <Button variant="outline-secondary" onClick={() => setShowChat(true)}>
                <IoChatboxEllipsesSharp className="me-2" /> Chat with Agent
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm bg-light border-success">
        <Card.Body>
          <h6 className="text-success fw-semibold">
            Delivery OTP for Secure Handover:
          </h6>
          <div className="display-6 fw-bold text-center">{deliveryOtp}</div>
          <p className="text-muted small mt-2 text-center">Please share this OTP with the delivery agent only upon receiving the order.</p>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h6 className="fw-semibold">Delivery Instructions</h6>
          <textarea
            className="form-control"
            rows="3"
            placeholder="e.g., Leave at the gate, call before arrival..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          ></textarea>
          <Button variant="outline-dark mt-2 float-end">Save Instructions</Button>
        </Card.Body>
      </Card>

      <div className="text-center my-4">
        <Button variant="outline-primary" className="px-4 me-2">
          Track Another Order
        </Button>
        <Button variant="danger" className="px-4">
          Report Delivery Issue
        </Button>
      </div>

      <Modal show={showChat} onHide={() => setShowChat(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chat with Delivery Agent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="border rounded p-2 mb-2" style={{ height: "200px", overflowY: "auto" }}>
            {chatMessages.map((msg, idx) => (
              <div key={idx}><strong>{msg.sender}:</strong> {msg.text}</div>
            ))}
          </div>
          <Form.Control
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button className="mt-2 w-100" onClick={handleSendMessage}>
            Send
          </Button>
        </Modal.Body>
      </Modal>
    </div>
 <Footer/>
 </>
  );
};

export default AdvancedOrderTrackingPage;