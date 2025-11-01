import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get("/api/admin/stats");
        setStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const revenueChartData = {
    labels: stats.revenuePerMonth ? stats.revenuePerMonth.map(item => item.month) : [],
    datasets: [
      {
        label: "Revenue",
        data: stats.revenuePerMonth ? stats.revenuePerMonth.map(item => item.amount) : [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <>
      <div
        style={{
          backgroundImage: "url('https://c8.alamy.com/comp/2R9B4AE/admin-login-sign-made-of-wood-on-a-table-2R9B4AE.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div className="container vh-100 p-5">
          <h2 className="mb-4">Admin Dashboard</h2>

          <div className="d-flex justify-content-center align-items-center gap-3 mb-4 flex-wrap w-100">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Revenue</h5>
                  <p className="card-text">
                    ₹{typeof stats.revenue === "number" ? stats.revenue.toFixed(2) : "0.00"}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Orders</h5>
                  <p className="card-text">{stats.totalOrders || 0}</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Vendors</h5>
                  <p className="card-text">{stats.totalVendors || 0}</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Customers</h5>
                  <p className="card-text">{stats.totalCustomers || 0}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center gap-3 mb-4 w-100 h-50">
            <div className="card p-3 pb-5">
              <div className="card-body  w-100 h-100 ">
                <h5 className="card-title">Monthly Revenue Stats</h5>
                <Bar data={revenueChartData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
