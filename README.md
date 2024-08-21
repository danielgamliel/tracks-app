# Tracks - React Native App

## Overview
Tracks is a mobile application built with React Native for tracking user locations and routes. This app allows users to sign up, log in, record their tracks, and view past routes. The project integrates a Node.js/Express backend for managing user data and Firebase for authentication.

## Features
- **User Authentication**: Secure sign-up and sign-in process using Firebase Authentication.
- **Track Recording**: Users can record their locations and routes while walking, running, or cycling.
- **Track Listing and Details**: View a list of saved tracks and their details, including maps of the recorded routes.
- **Real-Time Location Tracking**: Uses Expo and React Native's location APIs to track user location in real-time.
- **Integration with Node.js Backend**: Communicates with a Node.js/Express backend to manage user data and save tracks.

## Technologies Used
- **Frontend**: React Native, Expo
- **Backend**: Node.js, Express
- **Authentication**: Firebase Authentication
- **Database**: MongoDB (via the backend)
- **State Management**: Context API
- **HTTP Client**: Axios
- **Maps**: React Native Maps

## Getting Started

### Prerequisites
- Node.js (v14 or above)
- Expo CLI
- Firebase account
- MongoDB database (or any other database of your choice)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/tracks.git
   cd tracks


tracks/
│
├── backend/                # Node.js/Express backend code
│   ├── models/             # Mongoose models for MongoDB
│   ├── routes/             # Express routes
│   └── server.js           # Entry point for the backend server
│
├── src/
│   ├── api/                # Axios API client setup
│   ├── components/         # Reusable components
│   ├── context/            # Context API for state management
│   ├── hooks/              # Custom React hooks
│   ├── screens/            # Application screens
│   └── navigation/         # React Navigation setup
│

##API Endpoints
POST /signup: Register a new user
POST /signin: Sign in a user
GET /tracks: Retrieve all tracks for a user
POST /tracks: Save a new track
DELETE /tracks/
: Delete a specific track




