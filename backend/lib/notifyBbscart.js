// import axios from "axios";
// const WEBHOOK_URL = process.env.BBSCART_WEBHOOK_URL;
// const WEBHOOK_TOKEN = process.env.DELIVERY_WEBHOOK_TOKEN;

// async function notifyBbscart(payload) {
//   if (!WEBHOOK_URL || !WEBHOOK_TOKEN) return;
//   try {
//     await axios.post(WEBHOOK_URL, payload, {
//       headers: {
//         Authorization: `Bearer ${WEBHOOK_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       timeout: 5000,
//     });
//   } catch (e) {
//     console.error("[notifyBbscart] failed:", e.message);
//   }
// }
// module.exports = { notifyBbscart };
