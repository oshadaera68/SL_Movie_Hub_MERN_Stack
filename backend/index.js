/**
 *Coded By: Era Boy
 *Version: v0.1.0
 **/

const express = require("express");
const app = express();
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;
const cors = require("cors");

mongoose.connect(process.env.MONGO_LOCAL_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

const movie = require("./routes/movie");

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

app.use(cors(corsOptions));

// routes
app.use("/movie", movie);

app.listen(port, () => {
    console.log(`Task application listening on port ${port}`);
});