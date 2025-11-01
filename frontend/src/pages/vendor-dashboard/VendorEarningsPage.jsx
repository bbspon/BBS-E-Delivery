// VendorEarningsPage.jsx

import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Form
} from "react-bootstrap";
import {
  FaFileDownload,
  FaWallet,
  FaMoneyCheckAlt
} from "react-icons/fa";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const VendorEarningsPage = () => {
  const [salesSummary, setSalesSummary] = useState({
    totalSales: 500000,
    totalEarnings: 400000,
    commission: 100000,
    withdrawable: 75000
  });

  const [withdrawAmount, setWithdrawAmount] = useState("");

  const handleWithdrawRequest = () => {
    alert(`Withdrawal request of ₹${withdrawAmount} submitted.`);
  };

  const earningsGraphData = [
    { month: "Jan", earnings: 35000 },
    { month: "Feb", earnings: 42000 },
    { month: "Mar", earnings: 39000 },
    { month: "Apr", earnings: 52000 },
    { month: "May", earnings: 47000 },
    { month: "Jun", earnings: 61000 },
    { month: "Jul", earnings: 48000 }
  ];

  const gstSummary = [
    { month: "Apr", gross: 52000, commission: 7800, gst: 1404 },
    { month: "May", gross: 47000, commission: 7050, gst: 1269 },
    { month: "Jun", gross: 61000, commission: 9150, gst: 1647 }
  ];

  return (
    <>
    <Header/>
    <Container className=" fluid container my-5 p-5 border">
      <h2 className="mb-4 text-center fw-bold text-primary">
        Vendor Payouts & Earnings
      </h2>

      {/* Summary Cards */}
      <Row className="mb-4">
        <SummaryCard title="Total Sales" value={salesSummary.totalSales} icon="🛒" />
        <SummaryCard title="Total Earnings" value={salesSummary.totalEarnings} icon="💰" />
        <SummaryCard title="Commission Deducted" value={salesSummary.commission} icon="📉" />
        <SummaryCard title="Withdrawable Balance" value={salesSummary.withdrawable} icon="🏦" />
      </Row>

      {/* Withdraw Earnings */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title className="mb-3 text-success fw-bold">
            <FaWallet className="me-2" />
            Withdraw Earnings
          </Card.Title>
          <Row>
            <Col md={4}>
              <Form.Control
                type="number"
                placeholder="Enter amount to withdraw"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Form.Select>
                <option>Select payout method</option>
                <option>Bank Transfer</option>
                <option>UPI</option>
                <option>PayPal</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Button variant="success" onClick={handleWithdrawRequest}>
                Request Withdrawal
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Sales & Commission Table */}
      <DataSection title="Sales & Commission Summary">
        <ExportFilters />
        <Table responsive bordered>
          <thead className="table-primary">
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Sale Amount</th>
              <th>Commission</th>
              <th>Net Earnings</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#ORD101</td>
              <td>Product A</td>
              <td>₹10,000</td>
              <td>₹1,500</td>
              <td>₹8,500</td>
              <td>Completed</td>
              <td>2025-07-01</td>
            </tr>
          </tbody>
        </Table>
      </DataSection>

      {/* Payout History */}
      <DataSection title="Payout History">
        <Table responsive bordered>
          <thead className="table-secondary">
            <tr>
              <th>Payout ID</th>
              <th>Amount</th>
              <th>Payment Mode</th>
              <th>Status</th>
              <th>Date</th>
              <th>Reference</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#PAYOUT078</td>
              <td>₹20,000</td>
              <td>Bank Transfer</td>
              <td>Completed</td>
              <td>2025-06-28</td>
              <td>TXN56789ABC</td>
            </tr>
          </tbody>
        </Table>
      </DataSection>

      {/* 📊 Earnings Graph */}
      <DataSection title="Monthly Earnings Graph">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={earningsGraphData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <Line type="monotone" dataKey="earnings" stroke="#0d6efd" strokeWidth={3} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </DataSection>

      {/* 🧾 Tax & GST Summary */}
      <DataSection title="Tax & GST Summary">
        <Table bordered responsive>
          <thead className="table-warning">
            <tr>
              <th>Month</th>
              <th>Gross Earnings</th>
              <th>Commission</th>
              <th>GST @18%</th>
            </tr>
          </thead>
          <tbody>
            {gstSummary.map((row, idx) => (
              <tr key={idx}>
                <td>{row.month}</td>
                <td>₹{row.gross.toLocaleString()}</td>
                <td>₹{row.commission.toLocaleString()}</td>
                <td>₹{row.gst.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </DataSection>
    </Container>
    <Footer/>
    </>
  );
};

// --- Components ---
const SummaryCard = ({ title, value, icon }) => (
  <Col md={3}>
    <Card className="text-center shadow-sm mb-3 border-info">
      <Card.Body>
        <Card.Title className="text-info">{icon} {title}</Card.Title>
        <h4 className="fw-bold">₹{value.toLocaleString()}</h4>
      </Card.Body>
    </Card>
  </Col>
);

const DataSection = ({ title, children }) => (
  <Card className="mb-5 shadow-sm">
    <Card.Header className="bg-light fw-bold">{title}</Card.Header>
    <Card.Body>{children}</Card.Body>
  </Card>
);

const ExportFilters = () => (
  <div className="d-flex justify-content-between mb-3">
    <Form className="d-flex gap-2">
      <Form.Control type="date" />
      <Form.Control type="date" />
      <Form.Select>
        <option>All Status</option>
        <option>Completed</option>
        <option>Pending</option>
        <option>Failed</option>
      </Form.Select>
    </Form>
    <Button variant="outline-primary">
      <FaFileDownload className="me-1" /> Export CSV
    </Button>
  </div>
);

export default VendorEarningsPage;
