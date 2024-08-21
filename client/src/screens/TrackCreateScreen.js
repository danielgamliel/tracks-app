/**
 * Screen for creating a new track.
 * Manages location tracking and integrates with the location context.
 * Tracking starts when screen is in focus and stops when out of focus.
 */
// import '../_mockLocation';
import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useCallback } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';

const TrackCreateScreen = ({ navigation }) => {
  const { state, addLocation, stopRecording } = useContext(LocationContext);
  const [err] = useLocation(state.recording, location => {
    console.log('Adding location:', location);
    addLocation(location, state.recording);
  });

  useFocusEffect(
    useCallback(() => {
      console.log("TrackCreateScreen gained focus");
      if (state.recording) {
        return () => {
          stopRecording();
        };
      }
    }, [state.recording])
  );

  return (
    <SafeAreaView>
      <Text h2>Create a Track</Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default TrackCreateScreen;

