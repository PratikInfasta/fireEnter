import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { firestore } from './firebase/firebase';

const ProductScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Firestore
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'Products'));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setProducts(items);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product function
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'Products', id));
      Alert.alert('Success', 'Product deleted successfully');
      // Update local state after deletion
      setProducts(products.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      Alert.alert('Error', 'Failed to delete product');
    }
  };

  // Render each product item
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.name}>Product: {item.product_name}</Text>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Confirm Delete',
              'Are you sure you want to delete this product?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete(item.id) },
              ]
            );
          }}
        >
          <Image
            source={require('../assets/images/Trash.png')}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </View>
      <Text>Brand: {item.brand}</Text>
      <Text>Amount: ₹{item.amount}</Text>
      <Image
        source={{ uri: item.image }}
        style={{ width: 200, height: 200, borderRadius: 10 }}
        resizeMode="cover"
      />
      <Text>File path : {item.image}</Text>
    </View>
  );

  // Show loader while fetching data
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Product List</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ProductScreen;
