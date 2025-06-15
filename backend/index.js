/**
 *Coded By: Era Boy
 *Version: v0.1.0
 **/

const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;
const cors = require("cors");

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

app.use(express.json());

app.listen(port, () => {
    console.log(`Task application listening on port ${port}`);
});