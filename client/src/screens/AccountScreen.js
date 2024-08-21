import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text, Platform, StatusBar, Button } from 'react-native';

import * as SecureStore from 'expo-secure-store';
import { Context as AuthContext } from '../context/AuthContext';

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const loadEmail = async () => {
      const storedEmail = await SecureStore.getItemAsync("email");
      if (storedEmail) {
        setEmail(storedEmail);
      }
    };
    loadEmail();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Account Screen</Text>
      {email ? <Text style={styles.email}>email:  {email}</Text> : <Text style={styles.email}>Email not available</Text>}
      <Button title="Sign Out" onPress={signout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  text: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
  },
  email: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
});

export default AccountScreen;
