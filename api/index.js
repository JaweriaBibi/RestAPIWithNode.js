// require("dotenv").config();
// const express = require("express");
// const app = express();
// const connectDB = require("../db/connect");
// app.use(express.json()); // For parsing JSON


// const PORT = process.env.PORT;

// const product_routes = require("../routes/products");

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




const express = require("express");
const serverless = require("serverless-http");
const dotenv = require("dotenv");
const connectDB = require("../db/connect");

dotenv.config();

const app = express();
app.use(express.json());

const product_routes = require("../routes/products");

app.get("/", (req, res) => {
  res.send("Hello from Vercel!");
});

app.use("/api/products", product_routes);

// Connect to DB once at deployment
connectDB(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB Error:", err));

// Export serverless handler
module.exports = serverless(app);
