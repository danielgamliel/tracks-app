import React, { useContext, useCallback } from "react";
import { StyleSheet, FlatList, TouchableOpacity, View, Text, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Context as TrackContext } from "../context/TrackContext";

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks, deleteTrack } = useContext(TrackContext);

  useFocusEffect(
    useCallback(() => {
      fetchTracks();
    }, [])
  );

  const handleLongPress = (trackId) => {
    Alert.alert(
      "Delete Track",
      "Are you sure you want to delete this track?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteTrack(trackId), 
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <FlatList
      data={state}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate("TrackDetail", { _id: item._id })}
            onLongPress={() => handleLongPress(item._id)}
            style={styles.touchable}
          >
            <View style={styles.listItem}>
              <FontAwesome name="map-marker" size={30} color="#333" style={styles.icon} />
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 1,
    overflow: 'hidden',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    // elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  chevron: {
    fontSize: 18,
    color: "#ccc",
  },
});

export default TrackListScreen;
