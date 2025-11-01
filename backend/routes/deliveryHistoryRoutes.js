 const express = require("express");
 const router = express.Router();
 const deliveryHistoryController = require("../controllers/deliveryHistoryController");
//  const auth = require("../middlewares/authMiddleware"); // Optional

 router.get(
   "/",
//    auth.verifyToken,
   deliveryHistoryController.getAllDeliveryHistory
 );
 router.get(
   "/:orderId",
//    auth.verifyToken,
   deliveryHistoryController.getDeliveryById
 );
 router.post("/",
    //  auth.verifyToken,
     deliveryHistoryController.addDelivery);
 router.put(
   "/:orderId",
//    auth.verifyToken,
   deliveryHistoryController.updateDelivery
 );
 router.delete(
   "/:orderId",
//    auth.verifyToken,
   deliveryHistoryController.deleteDelivery
 );

 module.exports = router;
