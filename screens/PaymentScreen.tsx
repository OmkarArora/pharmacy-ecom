import React from 'react';
import { View, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

export default function PaymentScreen({ amount = 80000 }) {
  const handlePaymentResponse = (event : any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      Alert.alert('Payment Success', `Payment ID: ${data.razorpay_payment_id}`);
    } catch (error) {
      console.error('Payment parsing error:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        source={require('../assets/razorpay.html')}
        onMessage={handlePaymentResponse}
        injectedJavaScriptBeforeContentLoaded={`
          window.amount = ${amount};
        `}
      />
    </View>
  );
}
