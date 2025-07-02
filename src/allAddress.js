import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import { firestore } from './firebase/firebase'; // adjust your path
import { collection, getDocs } from 'firebase/firestore';

const AddressListScreen = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'Address'));
      const addressList = [];

      querySnapshot.forEach((doc) => {
        addressList.push(doc.data().address); // push each address string
      });

      setAddresses(addressList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Addresses</Text>

      {addresses.length > 0 ? (
        addresses.map((addr, index) => (
          <Text key={index} style={styles.addressText}>{addr}</Text>
        ))
      ) : (
        <Text>No addresses found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  addressText: { fontSize: 16, marginBottom: 10 },
});

export default AddressListScreen;
