const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// const deliveryAgentRoutes = require("./routes/deliveryAgentRoutes");
const assignedOrdersRoutes = require("./routes/assignedOrdersRoutes");
const deliveryHistoryRoutes = require("./routes/deliveryHistoryRoutes");
const trackOrderRoutes = require("./routes/trackOrderRoutes");
const routeOptimizationRoutes = require("./routes/routeOptimizationRoutes");
 const routeliveLocationRoutes = require("./routes/liveLocationRoutes");
const authRoutes = require("./routes/authRoutes");
const mapRoutes = require("./routes/mapRoutes");
const failedDeliveryRoutes = require("./routes/failedDeliveryRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const deliveryAnalytics  = require("./routes/analyticsRoutes");
const addressResolverRoutes = require("./routes/addressResolverRoutes");
const deliveryMapRoutes = require("./routes/deliveryMapRoutes");
const serviceabilityRoutes = require("./routes/serviceabilityRoutes");
const returnsRoutes = require("./routes/returnsRoutes");

 const path = require("path");
dotenv.config();
const app = express();
app.use(express.json({ limit: "1mb" }));   // <-- required
app.get("/api/_health", (req, res) => res.status(200).json({ ok: true }));
// Connect DB
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/public", express.static(path.join(__dirname, "public"))); // NEW

connectDB();
 app.use(
  cors({
     origin: true,
    credentials: true,
     methods: ["GET", "POST", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
 );
// Middlewares
app.use(cors());
app.use(express.json());
// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/deliveryagent", deliveryAgentRoutes);
 app.use(
   "/api/assigned-orders",
   (req, _res, next) => { console.log("[assigned-orders] hit:", req.method, req.url); next(); },
   assignedOrdersRoutes
 );
app.use("/api/deliveryhistory", deliveryHistoryRoutes);
app.use("/api/orders", trackOrderRoutes);
app.use("/api/route-optimization", routeOptimizationRoutes); // ✅ This line is required
app.use("/api/live-location", routeliveLocationRoutes); // ✅ This line is required
app.use("/api/map", mapRoutes);
app.use("/api/failed-deliveries", failedDeliveryRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/analytics", deliveryAnalytics);
app.use("/api/address", addressResolverRoutes);
app.use("/api/delivery-map", deliveryMapRoutes);
app.use("/api/assigned-orders", serviceabilityRoutes);
app.use("/api/assigned-orders", returnsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
