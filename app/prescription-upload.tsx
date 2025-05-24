import UploadPrescriptionScreen from '@/components/MultiPrescriptionUploader';
import React from 'react';
import { View } from 'react-native';

export default function UploadScreen() {
  
  return (
    <View style={{ flex: 1 }}>
      <UploadPrescriptionScreen/>
    </View>
  );
}
