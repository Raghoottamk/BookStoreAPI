const express = require("express");
const morgan = require("morgan");
const bookRouter = require("./routes/bookRoutes");

const app = express();

// Middleware
if (process.env.NODE_ENV === "development") {
  // we get from the config.env file
  app.use(morgan("dev"));
}
app.use(express.json());

// Routes
app.use("/api/books", bookRouter);

module.exports = app;
