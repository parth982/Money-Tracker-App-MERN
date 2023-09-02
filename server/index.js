const express = require("express");
const app = express();
const connectDB = require("./connectDB.js");

const cors = require("cors");
const Transaction = require("./Transcation.js");

app.use(cors());

app.use(express.json());

app.post("/api/transaction", async (req, res) => {
  const { name, price, dateTime, description } = req.body;
  const transaction = await Transaction.create({
    name,
    price,
    dateTime,
    description,
  });
  res.json(transaction);
});

app.get("/api/transactions", async (req, res) => {
  const transactions = await Transaction.find({});
  res.json(transactions);
});

const initiate = () => {
  connectDB()
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(process.env.PORT || 4000, () =>
        console.log("Server running on port 4000")
      );
    })
    .catch((err) => console.log(err.message));
};
initiate();
