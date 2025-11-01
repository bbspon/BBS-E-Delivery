import React, { useState, useEffect } from "react";
import { Table, Button, Form, Card, Row, Col, Modal, Alert } from "react-bootstrap";

const VendorPayoutsWalletPage = () => {
  const [walletData, setWalletData] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState(0);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    // Fetch data from API (mocked here)
    setWalletData({
      availableBalance: 3250,
      pendingEarnings: 800,
      totalEarnings: 24000,
      totalWithdrawn: 18000,
      lastPayoutDate: "2025-05-28",
      totalCommission: 3200,
    });
    setTransactions([
      { date: "2025-06-01", type: "Sale", amount: 450, note: "Order #1234" },
      { date: "2025-06-01", type: "Commission", amount: -45, note: "Platform Fee" },
      { date: "2025-05-28", type: "Payout", amount: -2000, note: "UPI: txn123456" },
    ]);
  }, []);

  const handlePayoutRequest = () => {
    if (payoutAmount > walletData.availableBalance) {
      setAlert("Withdrawal amount exceeds available balance.");
      return;
    }
    // Process payout request (send to backend)
    setAlert("Payout request submitted successfully.");
    setShowModal(false);
  };

  return (
    <>
    <div className="vw-100 vh-100" 
    style={{  backgroundImage: "url('https://thumbs.dreamstime.com/b/web-196824862.jpg')", backgroundSize: "cover", backgroundPosition: "Stretch" }}>
       
    <div className="container p-5  " 
    style={{minWidth : "100%", height: "100vh", boxShadow: "0px 0px 10px rgba(68, 48, 48, 0.56)", background: "rgba(250, 250, 250, 0.14)"}} >
      <h2 className="mb-4 text-white">Vendor Wallet & Payouts</h2>
      {alert && <Alert variant="info">{alert}</Alert>}

      <Row className="mb-4 ">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Available Balance</Card.Title>
              <h4>₹{walletData.availableBalance}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Pending Earnings</Card.Title>
              <h4>₹{walletData.pendingEarnings}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Earnings</Card.Title>
              <h4>₹{walletData.totalEarnings}</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Withdrawn</Card.Title>
              <h5>₹{walletData.totalWithdrawn}</h5>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Commission Charged</Card.Title>
              <h5>₹{walletData.totalCommission}</h5>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Last Payout</Card.Title>
              <h5>{walletData.lastPayoutDate}</h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0 text-white"> Transaction History</h4>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Request Payout
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={index}>
              <td>{tx.date}</td>
              <td>{tx.type}</td>
              <td className={tx.amount < 0 ? "text-danger" : "text-success"}>
                {tx.amount < 0 ? "-" : "+"}₹{Math.abs(tx.amount)}
              </td>
              <td>{tx.note}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Request Payout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Withdrawal Amount (₹)</Form.Label>
            <Form.Control
              type="number"
              value={payoutAmount}
              onChange={(e) => setPayoutAmount(Number(e.target.value))}
              placeholder="Enter amount"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Payout Method</Form.Label>
            <Form.Select>
              <option>Bank Transfer</option>
              <option>UPI</option>
              <option>Wallet Credit</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Note (optional)</Form.Label>
            <Form.Control type="text" placeholder="Add comment" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePayoutRequest}>
            Submit Request
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
    </>
  );
};

export default VendorPayoutsWalletPage;
