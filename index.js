const express = require('express');
const connectDB = require('./startup/db');
const app = express();
const cors = require('cors');
const collections = require("./routes/collections");
const products = require("./routes/products");
const auth = require("./routes/auth");
const users = require("./routes/users");



connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/collections", collections);
app.use("/api/products", products);
app.use("/api/auth", auth);
app.use("/api/users", users);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
