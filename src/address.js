import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from './firebase/firebase';

import { useNavigation } from '@react-navigation/native';
import { set } from 'firebase/database';


const MapScreen = () => {
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation()

    {
        loading && (
            <ActivityIndicator
                size="large"
                color="#0000ff"
                style={{ marginTop: 20 }}
            />
        )
    }


    const saveAddressToFirebase = async () => {
        if (address.trim() === '') {
            Alert.alert('Error', 'Please enter an address');
            return;
        }
        setLoading(true)
        try {
            await addDoc(collection(firestore, 'Address'), {
                address: address,
                createdAt: serverTimestamp(),
            });

            setLoading(false)
            Alert.alert(
                'Success',
                'Address saved to Firestore!',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            setAddress('');
                            console.warn(address)
                            console.log(address)
                            navigation.navigate('AddressList'); // navigate after OK
                        },
                    },
                ],
                { cancelable: false }
            );
            setAddress(''); // clear input after save
            console.warn(address)
            console.log(address)

            navigation.navigate('AddressList')

        } catch (error) {
            setLoading(false);
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 30, textAlign: 'center', marginVertical: 10 }}>Address</Text>

            <TextInput
                placeholder="Enter your address"
                value={address}
                onChangeText={setAddress}
                style={{
                    borderWidth: 1,
                    marginHorizontal: 20,
                    padding: 10,
                    marginBottom: 10,
                    borderRadius: 5,
                }}
            />

            {/* <Button title="Save Address" onPress={saveAddressToFirebase} /> */}
            <TouchableOpacity style={styles.button} onPress={saveAddressToFirebase}>
                <Text style={styles.buttonText}>{loading ? 'Uploading...' : 'Add Address'}</Text>
            </TouchableOpacity>


            <MapView
                style={{ flex: 1, marginTop: 10 }}
                showsUserLocation={true}
                initialRegion={{
                    latitude: 25.3176,
                    longitude: 82.9739,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}>
                <Marker
                    coordinate={{ latitude: 25.3176, longitude: 82.9739 }}
                    title={"My Marker"}
                    pinColor="red"
                />
            </MapView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16
    }
});
export default MapScreen;
