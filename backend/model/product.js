const mongoose = require("mongoose");
const mongooseAlgolia = require("mongoose-algolia");

const config = require("../config/index")

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
    comment: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    name: {
      type: String,
      require: true,
    },
    image: [
      {
        public_id: {
          type: String,
          require: true,
        },
        url: {
          type: String,
          require: true,
        },
      },
    ],
    brand: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    reviews: [reviewSchema],
    // Average rating
    rating: {
      type: Number,
      require: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      require: true,
      default: 0,
    },
    price: {
      type: Number,
      require: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
if ((process.env.NODE_ENV || config.env) != "test") {
  productSchema.plugin(mongooseAlgolia, {
    appId: process.env.ALGOLIA_APP_ID || config.algolia.applicationID,
    apiKey: process.env.ALGOLIA_API_KEY || config.algolia.adminAPIKey,
    indexName: config.name, //The name of the index in Algolia, you can also pass in a function
    debug: true,
  });
}

const Product = mongoose.model("Product", productSchema);

if ((process.env.NODE_ENV || config.env) != "test") {
  Product.SyncToAlgolia();
  Product.SetAlgoliaSettings({
    searchableAttributes: ["name", "brand", "category", "description", "price"],
    attributesForFaceting: ["category", "brand", "price"],
  });
}

module.exports = Product;
