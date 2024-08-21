/* should be same component as sign up*/

import React, {useState,  useContext, useEffect } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {clearErrorMessage() });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
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
      {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
      <Button 
        title="Sign In"  
        onPress={() => signin({ email, password }, navigation)} 
        buttonStyle={styles.button}
      />
      <TouchableOpacity onPress={() =>  navigation.navigate("Signup")}>
        <Text style={styles.link}>Don't have an account? Sign up instead</Text>
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

export default SigninScreen;
