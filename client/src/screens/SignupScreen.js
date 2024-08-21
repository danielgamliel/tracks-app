// TODO: same component as signin

import React, { useState, useContext, useEffect } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';

const SignUpScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localErrorMessage, setLocalErrorMessage] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      clearErrorMessage();
      setLocalErrorMessage(''); // Clear local error when screen is focused
    });
    return unsubscribe;
  }, []);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = () => {
    if (!isValidEmail(email)) {
      setLocalErrorMessage("Please enter a valid email address.\nvalid format : example@domain.com.");
      return;
    }
    signup({ email, password }, navigation);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput 
        label="Email" 
        value={email}
        placeholder="Email" 
        onChangeText={setEmail} 
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none" 
        placeholderTextColor="#999"
      />
      <TextInput 
        label="Password" 
        value={password} 
        placeholder="Password"
        onChangeText={setPassword}
        style={styles.input} 
        secureTextEntry 
        autoCorrect={false}
        autoCapitalize="none" 
        placeholderTextColor="#999"
      />
      {(state.errorMessage || localErrorMessage) ? (
        <Text style={styles.errorMessage}>
          {state.errorMessage || localErrorMessage}
        </Text>
      ) : null}
      <Button 
        title="Sign Up"  
        onPress={handleSignUp} 
        buttonStyle={styles.button}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
        <Text style={styles.link}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8'
  },
  title: {
    fontSize: 48,
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 25,
    paddingHorizontal: 10,
    fontSize: 18,
    color: '#333',
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginVertical: 15,
  },
  button: {
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  link: {
    fontSize: 16,
    color: '#007BFF',
    marginTop: 15,
  },
});

export default SignUpScreen;
