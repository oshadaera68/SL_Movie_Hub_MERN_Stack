/**
 *Coded By: Era Boy
 *Version: v0.1.0
 **/

// routes/signup.js
const router = require("express").Router();
const Signup = require("../model/signup.model");

router.post('/new-user', async (req, res, next) => {
    try {
        const { name, identifier, password, address } = req.body;

        // Use identifier as email
        const email = identifier;

        if (!email) {
            return res.status(400).send('Email is required');
        }

        const userExists = await Signup.findOne({ email });
        if (userExists) {
            return res.status(400).send('Email already exists');
        }

        const newUser = new Signup({ name, email, password, address });
        await newUser.save();

        res.status(201).send('Signup successful');
    } catch (error) {
        next(error);
    }
});

module.exports = router;

