import React, { useContext, useEffect, useRef } from "react";
import { Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
import { Context as LocationContext } from "../context/LocationContext";

const Map = () => {
  const {
    state: { currentLocation },
  } = useContext(LocationContext);

  const mapRef = useRef(null);

  useEffect(() => {
    if (currentLocation && mapRef.current) {
      mapRef.current.setCamera({
        center: {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        },
      });
      console.log("Camera centered on:", currentLocation.coords);
    }
  }, [currentLocation]);

  if (!currentLocation) {
    console.log("Unable to find current location");
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  const initialLocation = {
    longitude: 34.9457381,
    latitude: 32.4755401,
  };

  return (
    <MapView
      style={styles.map}
      ref={mapRef}
      initialRegion={{
        ...initialLocation,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Circle
        center={currentLocation.coords}
        radius={30}
        strokeColor="rgba(158, 158, 255, 1.0)"
        fillColor="rgba(158, 158, 255, 0.3)"
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default Map;
