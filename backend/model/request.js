const mongoose = require("mongoose");

const requestSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    approved: {
      type: Boolean,
      default: false,
      require: true,
    },
    approvedAt: {
      type: Date,
    },
    requestAt: {
      type: Date,
      require: true,
    },
    requestItems: {
      qty: { type: Number, required: true },
      price: { type: String, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    }
  })

const Request = mongoose.model("Request", requestSchema)

module.exports = Request;