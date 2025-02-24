import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { validateEmail, validatePhoneNumber } from '@/utils/validators';
import { processPayment } from '@/services/paymentService';

const Checkout = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: 'India',
    streetAddress: '',
    city: '',
    state: '',
    pinCode: '',
    phone: '',
    email: '',
    paymentMethod: 'creditCard',
    orderNotes: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleOrderPlacement = async () => {
    if (!formData.firstName || !formData.lastName || !formData.streetAddress || !formData.city || !formData.state || !formData.pinCode || !formData.phone || !formData.email) {
      Alert.alert('Error', 'All required fields must be filled.');
      return;
    }

    if (!validateEmail(formData.email)) {
      Alert.alert('Error', 'Invalid email address.');
      return;
    }

    if (!validatePhoneNumber(formData.phone)) {
      Alert.alert('Error', 'Invalid phone number.');
      return;
    }

    try {
      const response = await processPayment(formData);
      if (response.success) {
        Alert.alert('Success', 'Order placed successfully!');
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
        const errMessage = (error as Error).message || "An unexpected error occurred";
        console.error("Payment Error:", errMessage);
      }
  };

  return (
    <ScrollView style={{ padding: 20, backgroundColor: '#121212' }}>
      <Image source={require('../assets/logo.png')} style={{ width: 100, height: 100, alignSelf: 'center' }} />
      <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Checkout</Text>
      
      <TextInput placeholder='First Name *' value={formData.firstName} onChangeText={(text) => handleInputChange('firstName', text)} />
      <TextInput placeholder='Last Name *' value={formData.lastName} onChangeText={(text) => handleInputChange('lastName', text)} />
      <TextInput placeholder='Street Address *' value={formData.streetAddress} onChangeText={(text) => handleInputChange('streetAddress', text)} />
      <TextInput placeholder='City *' value={formData.city} onChangeText={(text) => handleInputChange('city', text)} />
      <TextInput placeholder='State *' value={formData.state} onChangeText={(text) => handleInputChange('state', text)} />
      <TextInput placeholder='PIN Code *' keyboardType='numeric' value={formData.pinCode} onChangeText={(text) => handleInputChange('pinCode', text)} />
      <TextInput placeholder='Phone *' keyboardType='phone-pad' value={formData.phone} onChangeText={(text) => handleInputChange('phone', text)} />
      <TextInput placeholder='Email *' keyboardType='email-address' value={formData.email} onChangeText={(text) => handleInputChange('email', text)} />
      <TextInput placeholder='Order Notes' value={formData.orderNotes} onChangeText={(text) => handleInputChange('orderNotes', text)} />
      
      <Image source={require('../assets/payment-options.png')} style={{ width: '100%', height: 50, marginVertical: 10 }} />
      
      <TouchableOpacity onPress={handleOrderPlacement}>
        <Text style={{ color: 'white', backgroundColor: 'orange', padding: 10, textAlign: 'center', borderRadius: 5 }}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Checkout;
