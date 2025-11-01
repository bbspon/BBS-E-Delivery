import React, { useState } from "react";
import { FaRobot, FaChartLine, FaBoxOpen, FaUserFriends, FaMagic, FaClock, FaDownload, FaGamepad, FaSyncAlt } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
import { GiCancel } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
const sections = [
  { id: "summary", label: "Performance Summary", icon: <FaChartLine /> },
  { id: "sales", label: "Sales Graph", icon: <FaClock /> },
  { id: "top", label: "Top Products", icon: <FaBoxOpen /> },
  { id: "buyers", label: "Buyer Insights", icon: <FaUserFriends /> },
  { id: "ai", label: "AI Suggestions", icon: <FaRobot /> },
  { id: "forecast", label: "Forecast Trends", icon: <FaMagic /> },
  { id: "export", label: "Export Reports", icon: <FaDownload /> },
  { id: "compare", label: "Vendor Comparison", icon: <FaSyncAlt /> },
  { id: "gamify", label: "Gamification", icon: <FaGamepad /> },
];

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Weekly Sales",
      data: [12000, 15000, 18000, 10000, 17000, 25000, 30000],
      fill: false,
      backgroundColor: "#ffc107",
      borderColor: "#ffc107",
    },
  ],
};

const topProducts = [
  { name: "Smart Water Bottle", revenue: "₹22,000", orders: 50 },
  { name: "UV Purifier Can", revenue: "₹18,000", orders: 38 },
  { name: "Combo Pack (5L + 20L)", revenue: "₹15,500", orders: 30 },
];

const suggestions = [
  "Restock Smart Bottle – trending in Pune.",
  "Offer 10% discount on Combo Pack next week.",
  "Bundle UV Can with filter accessories for 15% more conversions.",
];

const VendorAnalyticsPage = () => {
  const [activeSection, setActiveSection] = useState("summary");
 const navigate = useNavigate();
  const exportData = () => {
    alert("📄 Report downloaded as CSV (mock)");
  };

  return (
  <>
    <div className="container-fluid my-5 m-auto border p-5"
     style={{ maxWidth: "1400px", borderRadius: "10px" , height: "100vh" }}>
               <h3 className="mb-3 text-center text-warning fw-bold border-bottom pb-2 d-flex align-items-center gap-2 justify-content-between">
                 Vendor Performance Analytics Dashboard
                  <GiCancel
                    className="text-danger fs-4 cursor-pointer"
                    title="Go to Home"
                    onClick={() => navigate("/")}
                  />
                </h3>
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="list-group">
            {sections.map((s) => (
              <button
                key={s.id}
                className={`list-group-item list-group-item-action ${activeSection === s.id ? "active" : ""}`}
                onClick={() => setActiveSection(s.id)}
              >
                {s.icon} <span className="ms-2">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="col-md-9">
          <div className="card shadow" style={{ minHeight: "450px" }}>
            <div className="card-body">
              {activeSection === "summary" && (
                <div className="row">
                  {[{ title: "Total Sales", value: "₹1,20,000", color: "primary" },
                    { title: "Orders", value: "320", color: "success" },
                    { title: "Net Profit", value: "₹30,500", color: "warning" },
                    { title: "Return Rate", value: "3.4%", color: "danger" }].map((item, i) => (
                    <div className="col-md-6 col-lg-3 mb-3" key={i}>
                      <div className={`card text-white bg-${item.color}`}> 
                        <div className="card-body">
                          <h6>{item.title}</h6>
                          <h5 className="fw-bold">{item.value}</h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === "sales" && <Line data={data} />} 

              {activeSection === "top" && (
                <ul className="list-group">
                  {topProducts.map((product, i) => (
                    <li className="list-group-item d-flex justify-content-between" key={i}>
                      {product.name}
                      <span className="text-muted">
                        {product.revenue} / {product.orders} orders
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {activeSection === "buyers" && (
                <>
                  <p>🔹 Top Region: <strong>Mumbai</strong></p>
                  <p>🔹 Most Active Time: <strong>8PM–10PM</strong></p>
                  <p>🔹 Repeat Buyer Rate: <strong>27%</strong></p>
                </>
              )}

              {activeSection === "ai" && (
                <ul className="list-group">
                  {suggestions.map((tip, i) => (
                    <li className="list-group-item" key={i}>🔍 {tip}</li>
                  ))}
                </ul>
              )}

              {activeSection === "forecast" && (
                <>
                  <p>📈 Expected 18% sales growth next week.</p>
                  <p>🛍️ Festival demand surge likely for Combo Products.</p>
                  <p>⚠️ Stock alert: Smart UV Can inventory low.</p>
                </>
              )}

              {activeSection === "export" && (
                <div className="text-center">
                  <p>📥 Click below to export sales data.</p>
                  <button className="btn btn-outline-success" onClick={exportData}>Export CSV</button>
                </div>
              )}

              {activeSection === "compare" && (
                <div>
                  <p>📊 Your performance ranks #3 among top 10 vendors this month.</p>
                  <p>⭐ You are 12% above the platform average in sales volume.</p>
                </div>
              )}

              {activeSection === "gamify" && (
                <div>
                  <p>🏆 You’ve earned the “Top Seller of the Week” badge!</p>
                  <p>🔥 Compete to unlock new achievement levels and rewards.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default VendorAnalyticsPage;