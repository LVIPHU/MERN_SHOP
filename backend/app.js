const morgan = require("morgan");
const path = require("path");
const express = require("express");
const cors = require("cors");

const config = require("./config/index");
const corsConfig = require("./config/cors.config");
const connectDB = require("./config/mongo.config");

const { notFound, errorHandler } = require("./middlewares/errorHandlers");

const ImportData = require("./DataImport.js");
const brandRoutes = require("./routes/brand");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");
const uploadRoutes = require("./routes/upload");
const requestRoutes = require("./routes/request");

const app = express();

// Use morgan to detect http request
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Connect mongodb with mongoose
connectDB();

// Config
app.use(express.json());
app.use(cors(corsConfig));

// Main Routes
app.use("/api/import", ImportData);
app.use("/api/brands", brandRoutes);
app.use("/api/categories", categoryRoutes)
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/file", uploadRoutes);
app.use("/api/request", requestRoutes);

if ((process.env.NODE_ENV || config.env) != "test") {
  app.use(config.uploadImagePath, express.static(path.join(__dirname, "/uploads/images")));
  app.get("/api/config/paypal", (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID || config.paypalID)
  );
}

if ((process.env.NODE_ENV || config.env) === "production") {
  app.use(express.static(path.join(path.resolve("./"), "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(path.resolve("./"), "client", "build", "index.html")
    )
  );
} else {
  // Test server
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

// Error Handler
app.use(notFound);
app.use(errorHandler);

module.exports = app;
