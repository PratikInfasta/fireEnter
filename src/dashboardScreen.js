import React, { useState, } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, } from 'firebase/firestore';
import { firestore } from './firebase/firebase';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { storage } from './firebase/firebase';
import { PermissionsAndroid, Platform } from 'react-native';

// Make sure the path is correct

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('');
  const [amount, setAmount] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);


  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const apiLevel = Platform.constants?.Release
          ? parseInt(Platform.constants.Release)
          : 30;

        let permissions = [PermissionsAndroid.PERMISSIONS.CAMERA];
        let readPermissionKey = '';

        if (apiLevel >= 13) {
          permissions.push(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
          readPermissionKey = 'android.permission.READ_MEDIA_IMAGES';
        } else {
          permissions.push(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
          readPermissionKey = 'android.permission.READ_EXTERNAL_STORAGE';
        }

        const granted = await PermissionsAndroid.requestMultiple(permissions);

        const readGranted =
          granted[readPermissionKey] === PermissionsAndroid.RESULTS.GRANTED;
        const cameraGranted =
          granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED;

        if (!readGranted || !cameraGranted) {
          Alert.alert(
            'Permission Denied',
            'Camera and Storage permissions are required.'
          );
          return false;
        }

        return true;
      } catch (err) {
        console.warn('Permission error:', err);
        return false;
      }
    } else {
      return true; // iOS permissions are handled via Info.plist
    }
  };

  const handleImagePick = async () => {
    const permission = await requestPermissions();
    if (!permission) return;

    // open image picker
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setImageUri(uri);
      }
    });
  };

  const handleCameraLaunch = async () => {
    const permission = await requestPermissions();
    if (!permission) return;

    const options = {
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: true,
      quality: 0.8
    };

    const result = await launchCamera(options);

    console.log('Camera result:', result);

    if (result.didCancel) {
      console.log('User cancelled camera');
    } else if (result.errorCode) {
      console.log('Camera Error Code:', result.errorCode);
      console.log('Camera Error Message:', result.errorMessage);
    } else if (result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      console.log('Captured image URI:', uri);
      setImageUri(uri);
    }
  };

  const handleSelectImage = () => {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: handleCameraLaunch },
        { text: 'Choose from Gallery', onPress: handleImagePick },
        { text: 'Cancel', style: 'cancel' }
      ],
      { cancelable: true }
    );
  };

  const handleAddProduct = async () => {

    if (!productName || !brand || !amount) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    setUploading(true);
    try {
      await addDoc(collection(firestore, 'Products'), {
        product_id: 'prod_' + Date.now(), // add custom ID as a field (not doc name)
        product_name: productName,
        brand: brand,
        amount: parseFloat(amount),
        image: imageUri || ''
      });
      setUploading(false);
      Alert.alert(
        'Success',
        'Product added successfully',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('User canceled'),
            style: 'cancel'
          },
          {
            text: 'OK',
            onPress: () => {
              setProductName('');
              setBrand('');
              setAmount('');
              setImageUri(null);
              console.log('Product added');
              navigation.navigate('product')
            }
          }
        ],
        { cancelable: false }
      );
    } catch (error) {
      setUploading(false);
      console.error('Error adding product:', error);
      Alert.alert('Error', 'Failed to add product');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Product</Text>

      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Brand"
        value={brand}
        onChangeText={setBrand}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}

      <TouchableOpacity style={styles.uploadButton} onPress={handleSelectImage}>
        <Text style={styles.uploadText}>
          {imageUri ? 'Change Image' : 'Select Product Image'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleAddProduct} disabled={uploading}>
        <Text style={styles.buttonText}>{uploading ? 'Uploading...' : 'Add Product'}</Text>
      </TouchableOpacity>
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

export default DashboardScreen;

