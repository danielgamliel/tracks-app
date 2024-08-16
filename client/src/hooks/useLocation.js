/**
 * Custom hook for managing location tracking.
 * Starts or stops tracking based on the `shouldTrack` flag.
 * Handles permission requests and errors.
 */

import { useState, useEffect } from "react";
import { Accuracy, requestForegroundPermissionsAsync, watchPositionAsync } from "expo-location";

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null); 
  const [subscriber, setSubscriber] = useState(null); 

  useEffect(() => {
    shouldTrack ? !subscriber && startWatching() : subscriber?.remove() && setSubscriber(null); 
    // If shouldTrack is true, start watching the location, otherwise, remove the subscriber if exists
    return () => subscriber?.remove(); //remove subscriber when component unmounts or shouldTrack changes
  }, [shouldTrack, subscriber]); // re-run when shouldTrack or subscriber changes


  const startWatching = async () => {
    try {
      const { granted } = await requestForegroundPermissionsAsync();
      if (!granted) throw new Error("Location permission not granted");

      const sub = await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation, 
          timeInterval: 1000, 
          distanceInterval: 10, 
        },
        callback // Callback function to handle the location update
      );
      setSubscriber(sub); // Save the subscription object
    } catch (e) {
      setErr(e); 
    }
  };

  return [err]; 
};
