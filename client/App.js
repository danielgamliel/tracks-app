import React, { useEffect, useContext, useState } from 'react';
import { View, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import AccountScreen from "./src/screens/AccountScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import { Provider as AuthProvider, Context as AuthContext } from './src/context/AuthContext';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext';


const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function TrackListFlow() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TrackList" component={TrackListScreen} />
      <Stack.Screen name="TrackDetail" component={TrackDetailScreen} />
    </Stack.Navigator>
  );
}

function MainFlow() {
  return (
    <Tab.Navigator>
        <Tab.Screen 
        name="TrackListFlow" 
        component={TrackListFlow} 
        options={{
          tabBarLabel: 'Tracks',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="list" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen 
        name="TrackCreate" 
        component={TrackCreateScreen} 
        options={{
          tabBarLabel: 'Create Track',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="plus" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen 
        name="Account" 
        component={AccountScreen} 
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  const { state, tryLocalSignin } = useContext(AuthContext);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      await tryLocalSignin();
      setTimeout(() => {setIsReady(true)}, 1000);
    };  
    prepareApp();
  }, []);  


  if (!isReady) { 
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {state.token ? ( 
          <Stack.Screen name="MainFlow" component={MainFlow} />
        ) : (
          <>
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
   
  );
}


export default () => {
  return (
    <TrackProvider>
    <LocationProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    </LocationProvider>
     </TrackProvider>
  );
};
