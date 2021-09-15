// const express = require('express');
// const connectDB = require('./startup/db');
// const app = express();
// const cors = require('cors');
// const collections = require("./routes/collections");
// const products = require("./routes/products");
// const auth = require("./routes/auth");
// const users = require("./routes/users");



// // require ("dotenv").config()
// // const bodyParser = require("body-parser")
// const stripe = require("stripe") ("sk_test_51JYzMjLTAOH9KAabWNoJiZvh2qHxtWGyuqZh64YIZsMXJ96To5qyk3BqZ5UO6j8hTUFaTYjYKxlaghFS6Gh10iA200VyiuLRP2")
// // (process.env.STRIPE_SECRET_TEST)

// connectDB();

// app.use(express.json());
// app.use(cors({ origin: true }));
// app.use("/api/collections", collections);
// app.use("/api/products", products);
// app.use("/api/auth", auth);
// app.use("/api/users", users);

// // app.use(bodyParser.json())
// // app.use(bodyParser.urlencoded({ extended: true }))

// app.get('/', (request, response) => response.status(200).send ('hello world'))

// app.post('3002/payments/create', async (request, response) => {const total = request.query.total;

//   console.log('Payment Request Received for this amount >>>', total);

//   const paymentIntent = await stripe.paymentIntent.create({
//     amount: total,
//     currency: "usd",
//   });

//   response.status(201).send({
//     clientSecret: paymentIntent.client_Secret,
//   });

// });



// const port = process.env.PORT || 3002;
// app.listen(port, () => {
//   console.log(`Server started on port: ${port}`);
//   connectDB;
// });

const collections = require("./routes/collections");
const products = require("./routes/products");
const auth = require("./routes/auth");
const users = require("./routes/users");

const connectDB = require('./startup/db');

const express = require('express');
const app = express();
require("dotenv").config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)
const bodyParser = require('body-parser')
const cors = require('cors')



app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json)

app.use("/api/collections", collections);
app.use("/api/products", products);
app.use("/api/auth", auth);
app.use("/api/users", users);

app.use(cors())



app.post("/payment", cors(), async (req, res) => {
  let {amount, id} = req.body
  try {
    const payment = await stripe.peymentIntents.create({
      amount,
      currency: "USD",
      description: "Nike's mens downshifter",
      payment_method: id,
      confirm: true
    })
    console.log("Payment", payment)
    res.json({
      message: "Payment successful",
      success: true
    })

  } catch (error) {
    console.log("Error", error)
    res.jsdon({
      message: "Payment failed",
      sucsess: false
    })
  }
})
connectDB();



app.listen(process.env.PRT || 3005, () => {
  console.log('Server is listening on port 3005')
  connectDB
});
// const port = process.env.PORT || 3002;
// app.listen(port, () => {
//   console.log(`Server started on port: ${port}`);
//   connectDB;
// });