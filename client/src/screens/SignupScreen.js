// Example for adding error handling in SignUpScreen
import React, {useState,  useContext, useEffect } from 'react';
import { View,Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';

const SignUpScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Clear error message when the component is first rendered
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {clearErrorMessage() });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 51}}>Sign Up</Text>
      <Input 
        label="Email" 
        value={email} 
        onChangeText={setEmail} 
        autoCorrect={false}
        autoCapitalize="none" 
      />
      <Input 
        label="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        autoCorrect={false}
        autoCapitalize="none" 
      />
      {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
      <Button title="Sign Up"  onPress={() => signup({ email, password }, navigation)} />
      <TouchableOpacity onPress={() =>  navigation.navigate("Signin")}>
        <Text h5>Already have an account?</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    margin: 15,
    marginBottom: 100
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginVertical: 15,
  },
});

export default SignUpScreen;
