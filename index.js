const express = require('express');
const connectDB = require('./startup/db');
const app = express();
const cors = require('cors');
const collections = require("./routes/collections");
const auth = require("./routes/auth");



connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/collections", collections);
app.use("/api/auth", auth);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
})
