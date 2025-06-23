import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TextInput,
  Alert,
  ScrollView,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firestore } from './firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isvisiblePassword, setIsvisiblePassword] = useState(false);
  const [userEmail, setuserEmail] = useState('');
  const [password, setPassword] = useState('');
  const translateY = useRef(new Animated.Value(0)).current;
  const [orientation, setOrientation] = useState('PORTRAIT');

  const createUser = async () => {
    try {
      await addDoc(collection(firestore, 'Users'), {
        email: userEmail,
        password: password
      });

      Alert.alert(
        'Success',
        'User created successfully',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('User canceled'),
            style: 'cancel'
          },
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed');
              navigation.navigate('dashboard');
            }
          }
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -10,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [translateY]);

  // Orientation
  useEffect(() => {
    const handleOrientation = () => {
      const { height, width } = Dimensions.get('window');
      setOrientation(height >= width ? 'PORTRAIT' : 'LANDSCAPE');
    };

    const subscription = Dimensions.addEventListener('change', handleOrientation);
    handleOrientation();

    return () => {
      subscription?.remove();
    };
  }, []);

  const Content = (
    <View style={styles.container}>
      <View style={styles.sign_sec}>
        <View style={styles.sign_cond}>
          <View style={styles.sign_hd}>
            <Animated.Text style={{ transform: [{ translateY }] }}>
              <Text style={styles.sign_hdtxt}>Welcome Back!</Text>
            </Animated.Text>
          </View>
          <View style={styles.form_sec}>
            <View style={styles.gblform_input}>
              <View style={styles.user_icon}>
                <Image source={require('../assets/images/User.png')} />
              </View>
              <View style={styles.gbl_input}>
                <TextInput
                  placeholder="enter a Email"
                  placeholderTextColor={'#676767'}
                  style={styles.input_txt}
                  value={userEmail}
                  onChangeText={setuserEmail}
                />
              </View>
            </View>
            <View style={[styles.gblform_input, { justifyContent: 'space-between' }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flexBasis: 180, flexGrow: 1 }}>
                <View style={styles.user_icon}>
                  <Image source={require('../assets/images/password.png')} />
                </View>
                <View style={styles.gbl_input}>
                  <TextInput
                    placeholder="enter a Password"
                    placeholderTextColor="#676767"
                    style={styles.input_txt}
                    secureTextEntry={!isvisiblePassword}
                    onChangeText={setPassword}
                    value={password}
                  />
                </View>
              </View>
              <TouchableOpacity onPress={() => setIsvisiblePassword(!isvisiblePassword)}>
                <View style={styles.show_passeye}>
                  <Image
                    source={
                      isvisiblePassword
                        ? require('../assets/images/eye.png')
                        : require('../assets/images/hiddeneye.png')
                    }
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={styles.link}>
          Create An Account{' '}
          <Text onPress={() => navigation.navigate('dashboard')}>
            <Text style={{ textDecorationLine: 'underline', color: 'red' }}>Signups</Text>
          </Text>
        </Text>
      </View>
      <TouchableOpacity onPress={createUser}>
        <View style={[styles.gbl_btn, { marginTop: orientation ? 50 : 0 }]}>
          <Text style={styles.gbl_btntxt}>Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return orientation === 'LANDSCAPE' ? <ScrollView>{Content}</ScrollView> : Content;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  sign_sec: {
    marginHorizontal: 16,
    marginTop: 19,
    flex: 1
  },
  sign_hd: {
    maxWidth: 185,
    marginBottom: 36
  },
  sign_hdtxt: {
    fontSize: 36,
    fontWeight: '700',
    fontFamily: 'Montserrat-Bold',
    lineHeight: 43
  },
  gblform_input: {
    borderWidth: 1,
    borderColor: '#626262',
    borderRadius: 10,
    height: 55,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 11,
    backgroundColor: '#F3F3F3',
    marginBottom: 31
  },
  input_txt: {
    fontSize: 12,
    fontWeight: '900',
    fontFamily: 'Montserrat-Medium',
    color: '#676767',
    paddingRight: 20,
    flex: 1
  },
  gbl_btn: {
    backgroundColor: '#F83758',
    borderRadius: 4,
    marginHorizontal: 32,
    marginBottom: 30
  },
  gbl_btntxt: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 55
  },
  gbl_input: {
    flexBasis: 150,
    flexGrow: 1,
    flexShrink: 1
  }
});

export default LoginScreen;
