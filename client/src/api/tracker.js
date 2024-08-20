import axios from "axios";
import * as SecureStore from 'expo-secure-store';

// Create an Axios instance with a base URL for the API
const instance = axios.create({
  baseURL: "https://ccb1-94-188-253-157.ngrok-free.app/",
});

// Add a request interceptor to the Axios instance
// This interceptor will run before every request sent by this instance
instance.interceptors.request.use(
  async (config) => {
    // Retrieve the token from SecureStore
    const token = await SecureStore.getItemAsync("token");

    // If a token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }

    // Return the updated config object
    return config;
  },
  (err) => {
    // Handle any errors that occur during the request setup
    return Promise.reject(err);
  }
);

export default instance;
