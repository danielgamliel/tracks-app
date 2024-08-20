import React, { useContext, useEffect, useRef } from "react";
import { Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, {Polyline, Circle } from "react-native-maps";
import { Context as LocationContext } from "../context/LocationContext";

const Map = () => {
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);

  const mapRef = useRef(null);
  console.log("Current location:", currentLocation);

  useEffect(() => {
    if (currentLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      console.log("Camera centered on:", currentLocation.coords);
    }
  }, [currentLocation]);

    /* //Enable it when using real location:

  if (!currentLocation) {
    console.log("Unable to find current location");
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  } 
  */
  const initialLocation = {
      latitude: 37.33233141, 
    longitude: -122.0312186,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <MapView
      style={styles.map}
      ref={mapRef}
      initialRegion={currentLocation ? {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      } : initialLocation}
    >
      {currentLocation && (
        <Circle
          center={currentLocation.coords}
          radius={30}
          strokeColor="rgba(158, 158, 255, 1.0)"
          fillColor="rgba(158, 158, 255, 0.3)"
        />
      )}
      <Polyline coordinates={locations.map((loc) => loc.coords)} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default Map;
