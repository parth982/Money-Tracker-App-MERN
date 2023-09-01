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
    dateTime,
    description,
  });
  console.log(transaction);
  res.json(req.body);
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
