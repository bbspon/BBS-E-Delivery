const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    agentId: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comments: {
      type: String,
      maxlength: 500,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
