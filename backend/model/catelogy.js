const mongoose = require("mongoose");

const catelogySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        require: true,
      },
      url: {
        type: String,
        require: true,
      },
    },
    description: {
      type: String,
      default: " ",
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Catelogy = mongoose.model("Catelogy", catelogySchema);

module.exports = Catelogy;
