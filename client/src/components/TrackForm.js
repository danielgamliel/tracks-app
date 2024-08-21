import React, { useContext } from 'react';
import { Context as LocationContext } from '../context/LocationContext';
import { View, Alert, SafeAreaView, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import useSaveTrack from '../hooks/useSaveTrack';

const TrackForm = ({ navigation }) => {
  const { state: { name, recording, locations },
    startRecording, stopRecording, changeName } = useContext(LocationContext);
  const [saveTrack] = useSaveTrack();

  const handleStartRecording = () => {
    if (!name) {
      Alert.alert('Please enter a name for the track');
      return;
    }
    startRecording();
  };

  const handleSaveTrack = () => {
    saveTrack(navigation);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={name}
        onChangeText={changeName}
        placeholder="Enter name"
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        {recording ? (
          <TouchableOpacity onPress={stopRecording} style={[styles.button, styles.stopButton]}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartRecording} style={[styles.button, styles.startButton]}>
            <Text style={styles.buttonText}>Start Recording</Text>
          </TouchableOpacity>
        )}
      </View>
      {!recording && locations.length ? (
        <TouchableOpacity onPress={handleSaveTrack} style={[styles.button, styles.saveButton]}>
          <Text style={styles.buttonText}>Save Recording</Text>
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  buttonContainer: {
    marginVertical: 10,
    height: 30, 
  },
  button: {
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  startButton: {
    backgroundColor: 'green',
  },
  stopButton: {
    backgroundColor: 'red',
  },
  saveButton: {
    backgroundColor: 'blue',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    height: 30, 
    fontWeight: 'bold',
  },
});

export default TrackForm;
