const { model, Schema } = require("mongoose");

const TransactionScherma = new Schema({
  name: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  dateTime: {
    type: "string",
    required: true,
  },
});

const TransactionModel = model("Transaction", TransactionScherma);
module.exports = TransactionModel;
