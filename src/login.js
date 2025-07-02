import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const [region, setRegion] = useState({
    latitude: 25.3176,
    longitude: 82.9739,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const zoomIn = () => {
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    });
  };

  const zoomOut = () => {
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 30, textAlign: 'center', marginVertical: 10 }}>Address</Text>

      <MapView
        style={{ flex: 1 }}
        region={region}
        onRegionChangeComplete={(reg) => setRegion(reg)}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{ latitude: 25.3176, longitude: 82.9739 }}
          title={"My Marker"}
          pinColor="red"
        />
      </MapView>

      <View style={styles.zoomContainer}>
        <TouchableOpacity style={styles.zoomButton} onPress={zoomIn}>
          <Text style={styles.zoomText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={zoomOut}>
          <Text style={styles.zoomText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  zoomContainer: {
    position: 'absolute',
    right: 20,
    bottom: 50,
    top:0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    elevation: 5,
  },
  zoomText: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'red'
  },
});

export default MapScreen;
