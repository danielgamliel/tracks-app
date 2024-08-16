import React, { useState, useContext,useEffect } from 'react';
import { View,Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
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
      <Text style={{ fontSize: 51}}>Sign In</Text>
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
      <Button title="Sign In" onPress={() => signin({ email, password }, navigation)} />
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text h5>Don't have an account? Sign up instead</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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

export default SigninScreen;
