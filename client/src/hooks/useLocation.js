import { useState, useEffect } from "react";
import { Accuracy, requestForegroundPermissionsAsync, watchPositionAsync } from "expo-location";

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);
  const [subscriber, setSubscriber] = useState(null);

  useEffect(() => {
    console.log('useLocation hook triggered, shouldTrack:', shouldTrack);

    const startWatching = async () => {
      try {
        console.log('Requesting location permissions...');
        const { granted } = await requestForegroundPermissionsAsync();
        if (!granted) throw new Error("Location permission not granted");

        console.log('Starting to watch position...');
        const sub = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          (location) => {
            console.log('New location received:', location);
            callback(location);
          }
        );
        setSubscriber(sub);
        console.log('Subscriber set');
      } catch (e) {
        console.log('Error starting watchPositionAsync:', e);
        setErr(e);
      }
    };

    if (shouldTrack) {
      if (!subscriber) {
        startWatching();
      } else {
        console.log('Already tracking location');
      }
    } else {
      if (subscriber) {
        console.log('Stopping location tracking');
        subscriber.remove();
        setSubscriber(null);
      }
    }

    return () => {
      if (subscriber) {
        console.log('Cleaning up subscriber');
        subscriber.remove();
        setSubscriber(null);
      }
    };
  }, [shouldTrack, callback]);

  return [err];
};
