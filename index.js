const express = require('express');
const connectDB = require('./startup/db');
// const app = express();
const cors = require('cors');
const collections = require("./routes/collections");
const auth = require("./routes/auth");

const app = express();

connectDB();

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
})
