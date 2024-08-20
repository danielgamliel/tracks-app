import { useContext } from 'react';
import { Context as TrackContext } from '../context/TrackContext';
import { Context as LocationContext } from '../context/LocationContext';
import {  CommonActions } from '@react-navigation/native';


export default () => {
  const { createTrack } = useContext(TrackContext);
  const {
    state: { locations, name },
    reset
  } = useContext(LocationContext);
  

  const saveTrack = async (navigation) => {
    await createTrack(name, locations);
    reset();
    navigation.navigate('TrackList');
  };

  return [saveTrack];
};
