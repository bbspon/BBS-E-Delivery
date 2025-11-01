// File: src/pages/vendor-dashboard/Page.jsx

import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const summaryCardItems = [
  { title: "Today's Orders", key: "todaysOrders", link: "/vendor/orders" },
  { title: "This Week's Sales", key: "weeklySales", link: "/vendor/analytics" },
  { title: "Active Listings", key: "activeListings", link: "/vendor/products" },
  { title: "Low Stock Alerts", key: "lowStock", link: "/vendor/inventory" },
  { title: "Cancelled Orders", key: "cancelledOrders", link: "/vendor/orders" },
  { title: "Items in Stock", key: "totalStock", link: "/vendor/inventory" },
  { title: "Pending Payouts", key: "pendingPayouts", link: "/vendor/payouts" },
  { title: "Active Customers", key: "activeCustomers", link: "/vendor/customers" },
  { title: "Module Breakdown", key: "moduleBreakdown", link: "/vendor/products" }
];

export default function VendorDashboardPage() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/vendor/dashboard")
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      });
  }, []);

  const barData = {
    labels: stats?.weeklyLabels || [],
    datasets: [
      {
        label: "Revenue",
        data: stats?.weeklyRevenue || [],
        backgroundColor: "#3b82f6"
      }
    ]
  };

  const pieData = {
    labels: stats?.categoryLabels || [],
    datasets: [
      {
        data: stats?.categorySales || [],
        backgroundColor: ["#60a5fa", "#34d399", "#fbbf24", "#f87171"]
      }
    ]
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4 fw-bold fs-4 text-center">Vendor Dashboard</h1>

      {/* Summary Cards */}
      <div className="row g-3 mb-4 justify-content-center">
        {summaryCardItems.map(item => (
          <div
            key={item.key}
            className="col-12 col-sm-6 col-md-4 col-lg-3"
            onClick={() => navigate(item.link)}
            style={{ cursor: "pointer" }}
          >
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <p className="text-muted small mb-1">{item.title}</p>
                <h5 className="fw-semibold">
                  {loading ? "--" : stats[item.key] ?? 0}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="row g-4 justify-content-center">
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">Weekly Revenue</h5>
              <Bar data={barData} />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">Sales by Category</h5>
              <Pie data={pieData} />
            </div>
          </div>
        </div>
      </div>

      {/* Shortcut Actions */}
      <div className="mt-5 text-center d-flex flex-wrap gap-3 justify-content-center">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/vendor/products/new")}
        >
          + Add New Product
        </button>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/vendor/inventory/upload")}
        >
          Upload Inventory Sheet
        </button>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/vendor/settings")}
        >
          Go to Store Settings
        </button>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/vendor/payouts")}
        >
          Request Payout
        </button>
      </div>
    </div>
  );
}
