import * as SecureStore from 'expo-secure-store'; 
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { CommonActions } from '@react-navigation/native';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};
// If there is a token on the device then the user directed to main flow
const tryLocalSignin = dispatch => async () => {
  const token = await SecureStore.getItemAsync('token');
  if (token) {
    dispatch({ type: 'signin', payload: token });
    console.log(token);
  } else{
    console.log("no token");

  }
};

// Function to handle user signup
const signup = dispatch => async ({ email, password }, navigation) => {
  try {
    const response = await trackerApi.post("/signup", { email, password });
    // Save the token securely using SecureStore
    await SecureStore.setItemAsync("token", response.data.token);
    await SecureStore.setItemAsync("email", email);
    dispatch({ type: "signup", payload: response.data.token, email });
     await SecureStore.setItemAsync("email", email);
    console.log("email: ", email);
    console.log(response.data.token);
    navigation.dispatch(
      CommonActions.replace('MainFlow')
    );
  } catch (err) {dispatch({type: "add_error",payload: "Something went wrong with sign up"})}
};

// Function to handle user signin
const signin = dispatch => async ({ email, password }, navigation) => {
  try {
    const response = await trackerApi.post("/signin", { email, password });
    // Save the token securely using SecureStore
    await SecureStore.setItemAsync("token", response.data.token);
    await SecureStore.setItemAsync("email", email);
    dispatch({ type: "signin", payload: response.data.token, email });
    console.log("email: ", email);
    navigation.dispatch(CommonActions.replace('MainFlow'));
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
  }
};

// Function to handle user signout
const signout = dispatch => async (navigation) => {
  try {
    // Remove the token securely from SecureStore
    await SecureStore.deleteItemAsync("token");
    dispatch({ type: "signout" });
    navigate("Signin");
  } catch (err) {
    dispatch({type: "add_error",payload: "Something went wrong with sign out",});
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: 'clear_error_message' });
};

// Exporting the Context and Provider using createDataContext
export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, tryLocalSignin, clearErrorMessage },
  { token: null, errorMessage: "" }
);
