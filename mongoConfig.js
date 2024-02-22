/* eslint-disable require-jsdoc */
const mongoose = require("mongoose");
require("dotenv").config();

const mongoDB = process.env.MONGODB_URI;

async function main() {
    await mongoose.connect(mongoDB);
    console.log("Connected to MongoDB");
  }
  mongoose.set("strictQuery", false);

module.exports = { main };