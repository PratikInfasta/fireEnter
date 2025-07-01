// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// const OTPScreen = () => {
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const inputs = useRef([]);
//   const navigation = useNavigation()

//   const handleChange = (text, index) => {
//     if (/^\d$/.test(text)) {
//       const newOtp = [...otp];
//       newOtp[index] = text;
//       setOtp(newOtp);
//       // Move to next input
//       if (index < 3) {
//         inputs.current[index + 1].focus();
//       }
//     }
//   };

//   const handleSubmit = () => {
//     const enteredOtp = otp.join('');
//     if (enteredOtp.length < 4) {
//       Alert.alert('Please enter the complete OTP');
//       return;
//     }
//     Alert.alert('OTP Entered', enteredOtp);
    
//     navigation.navigate('product');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Enter OTP</Text>
//       <View style={styles.otpContainer}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             style={styles.input}
//             keyboardType="number-pad"
//             maxLength={1}
//             ref={ref => inputs.current[index] = ref}
//             onChangeText={text => handleChange(text, index)}
//             value={digit}
//           />
//         ))}
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Submit OTP</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default OTPScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 22,
//     marginBottom: 20,
//     fontWeight: 'bold',
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   input: {
//     borderBottomWidth: 2,
//     borderColor: '#333',
//     width: 50,
//     height: 50,
//     textAlign: 'center',
//     fontSize: 20,
//     marginHorizontal: 5,
//   },
//   button: {
//     marginTop: 30,
//     backgroundColor: '#4CAF50',
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
// });




// import React, { useState } from 'react';
// import { View, TextInput, Button, Alert } from 'react-native';
// import axios from 'axios';

// const OtpScreen = () => {
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [userId, setUserId] = useState('user123'); // Example user ID

//   const sendOtp = () => {
//     axios.post('http://<YOUR_SERVER_IP>:5000/send-otp', { email, userId })
//       .then(res => Alert.alert(res.data))
//       .catch(err => Alert.alert('Error sending OTP'));
//   };

//   const verifyOtp = () => {
//     axios.post('http://<YOUR_SERVER_IP>:5000/verify-otp', { userId, otp })
//       .then(res => Alert.alert(res.data))
//       .catch(err => Alert.alert('Invalid or expired OTP'));
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <TextInput
//         placeholder="Enter Email"
//         value={email}
//         onChangeText={setEmail}
//         style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
//       />
//       <Button title="Send OTP" onPress={sendOtp} />

//       <TextInput
//         placeholder="Enter OTP"
//         value={otp}
//         onChangeText={setOtp}
//         keyboardType="numeric"
//         style={{ borderWidth: 1, marginVertical: 10, padding: 5 }}
//       />
//       <Button title="Verify OTP" onPress={verifyOtp} />
//     </View>
//   );
// };

// export default OtpScreen;
    