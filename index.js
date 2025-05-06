require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const serverless = require("serverless-http");
app.use(express.json()); // For parsing JSON


const PORT = process.env.PORT;

const product_routes = require("./routes/products");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/products", product_routes);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();

module.exports.handler = serverless(app);
