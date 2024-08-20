/* This middleware make sure 
the user is signed in */
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { secretKey } from '../routes/mongoCredentials.js';
const User = mongoose.model('User');

// Middleware function to authenticate requests
const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers; // the token is on the header of the request
    if (!authorization) return res.status(401).send({ error:"You must be logged in"});
    const token = authorization.replace('bearer ', ''); // Remove 'bearer ' from the token string
    // Verify the token using the secret key
    jwt.verify(token, secretKey, async (err, payload) => {
        if (err) {
            console.error('JWT verification failed:', err.message); // Log the error just for debugging
            return res.status(401).send({ error: 'Error logging in'});
        }
        const { userId } = payload; // Extract userId from the payload
        const user = await User.findById(userId);
        req.user = user; // Attach the user object to the request object
        next(); 
    });
};

export default requireAuth;
