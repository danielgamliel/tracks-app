import React, { useContext } from 'react';
import { Input, Button } from 'react-native-elements';
import { Context as LocationContext } from '../context/LocationContext';
import { View, Alert } from 'react-native';

const TrackForm = () => {
  const {state: { name, recording },startRecording,stopRecording,changeName} = useContext(LocationContext);

  const handleStartRecording = () => {
    if (!name) {
      Alert.alert('Please enter a name for the track');
      return;
    }
    startRecording();
  };

  return (
    <>
      <Input
        value={name}
        onChangeText={changeName}
        placeholder="Enter name"
      />
      {recording ? (
        <Button title="Stop" onPress={stopRecording} buttonStyle={{ backgroundColor: 'red' }} />
      ) : (
        <Button title="Start Recording" onPress={handleStartRecording} buttonStyle={{ backgroundColor: 'green' }} />
      )}
    </>
  );
};

export default TrackForm;
