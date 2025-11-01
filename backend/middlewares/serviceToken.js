module.exports = function serviceToken(req, res, next) {
   if (req.method === "OPTIONS") {
   return res.sendStatus(200);
 }
  const auth = req.header("Authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token || token !== process.env.DELIVERY_INGEST_TOKEN) {
    return res.status(401).json({ message: "Unauthorized (service token)" });
  }
  next();
};
