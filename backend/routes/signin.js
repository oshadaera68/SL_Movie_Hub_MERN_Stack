/**
 *Coded By: Era Boy
 *Version: v0.1.0
 **/
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const SignUp = require("../model/signup.model");

router.post("/", async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await SignUp.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password (user not found)" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password (wrong password)" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || "default_secret_key",
            { expiresIn: "1d" }
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
