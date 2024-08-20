import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// Import the models to ensure they are registered with Mongoose
import './models/User.js';
import './models/Track.js';

// Import routes and middleware after models
import authRoutes from './routes/authRoutes.js';
import trackRoutes from './routes/trackRoutes.js';
import { mongoUri } from './routes/mongoCredentials.js';
import requireAuth from './middleware/requireAuth.js'; 

// Create an instance of Express
const server = express();

// server.use(bodyParser.json()); // Use body-parser middleware to parse JSON requests
server.use(express.json()); // Use express's built-in middleware to parse JSON requests

server.use(authRoutes); // Use the authentication routes - creating a user
server.use(trackRoutes); // Use the track routes - after auth routes

// Connect to MongoDB using Mongoose
mongoose.connect(mongoUri).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB: ", err);
});

// Define a protected route that uses the authentication middleware
server.get('/', requireAuth, (req, res) => {
  res.send(`Hello, ${req.user.email}`);
});

// Start the server and listen on port 3000 - temporarily
server.listen(3000, () => {
  console.log("Listening on port 3000");
});
