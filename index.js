// require("dotenv").config();
// const express = require("express");
// const app = express();
// const connectDB = require("./db/connect");



// const PORT = process.env.PORT;

// const product_routes = require("./routes/products");

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.use("/api/products", product_routes);

// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI);
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// start();




require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const connectDB = require("../db/connect");
const product_routes = require("../routes/products");

const app = express();

app.use(express.json()); // For parsing JSON
app.use("/api/products", product_routes);

app.get("/", (req, res) => {
  res.send("Hello World from Vercel");
});

// Connect to DB once at cold start
connectDB(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Export as serverless function
module.exports.handler = serverless(app);
