import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DeliveryAnalyticsPage = () => {
  const [stats, setStats] = useState(null);
  const [agentStats, setAgentStats] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/analytics");
        setStats(res.data.summary);
        setAgentStats(res.data.agentStats);
      } catch (error) {
        console.error("Analytics fetch error:", error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="container mt-4">
      <h2>📊 Delivery Analytics Dashboard</h2>

      {!stats ? (
        <p>Loading analytics...</p>
      ) : (
        <>
          <div className="row text-center mb-4">
            <div className="col-md-4">
              <h5>Total Orders</h5>
              <h3>{stats.totalOrders}</h3>
            </div>
            <div className="col-md-4">
              <h5>Delivered</h5>
              <h3 className="text-success">{stats.delivered}</h3>
            </div>
            <div className="col-md-4">
              <h5>Failed</h5>
              <h3 className="text-danger">{stats.failed}</h3>
            </div>
          </div>

          <h4>📦 Order Status Distribution</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stats.statusBreakdown}
                dataKey="value"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {stats.statusBreakdown.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          <h4 className="mt-5">🧍 Agent-wise Deliveries</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={agentStats}>
              <XAxis dataKey="agentId" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="delivered" fill="#82ca9d" name="Delivered Orders" />
              <Bar dataKey="failed" fill="#f44336" name="Failed Orders" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default DeliveryAnalyticsPage;
