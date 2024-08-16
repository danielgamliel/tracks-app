import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { secretKey } from './mongoCredentials.js'; // Import the token key for JWT signing
const User = mongoose.model('User'); // Retrieve the User model from Mongoose

// Create an instance of Express Router
const router = express.Router();

// Define a POST route for user signup
router.post('/signup', async (req, res) => {
    const { email, password } = req.body; // Destructure email and password from the request body
    // Check if email and password are provided
    if (!email || !password) {return res.status(400).send('Missing Email or password')}
    try {
        // Create a new user instance with the provided email and password
        const user = new User(req.body);
        await user.save();  // Save the user to the database
        // GenerateJWT token for the newly created user
        const token = jwt.sign({ userId: user._id }, secretKey); 
        res.send({ token }); // Send the token as the response
    } catch (err) {
        // Handle duplicate email error
        if (err.code === 11000) {return res.status(422).send('Email already in use')}
        res.status(422).send(err.message);  // Handle other errors
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body; 
    if (!email || !password) {return res.status(422).send({error: 'invalid email or password'})}
    try {
        const user = await User.findOne({email})
        if(!user){return res.status(404).send({error: 'Email not found'})}
        await user.comparePassword(password)
        const token = jwt.sign({ userId: user._id }, secretKey); 
        res.send({ token }); // Send the token as the response
    } catch (err) {
       return res.status(422).send({error: 'invalid email or password'})
    }
});


export default router;
