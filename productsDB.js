require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/products");

const jsonData = require("./products.json");

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(jsonData);
        console.log("Successfully created products");
    } catch (error) {
        console.log(error);
    }
}

start();
