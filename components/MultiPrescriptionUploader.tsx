import React, { useState } from 'react';
import {
  View,
  Button,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ORDERS_BASE_URL } from '@/lib/values';
import { useStorageState } from '@/hooks/useStorageState';
import { getAccessToken } from '@/lib/SessionProvider';


const UploadPrescriptionScreen = () => {
  const [selectedImages, setSelectedImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [uploading, setUploading] = useState(false);
  const [[_, username]] = useStorageState("username");

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImages([...selectedImages, ...result.assets]);
    }
  };

  const handleSubmit = async () => {
    if (selectedImages.length === 0) {
      Alert.alert('No images selected');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();

      // Add user_name (can be dynamic)
      formData.append('user_name', username || '');

      selectedImages.forEach((image, index) => {
        formData.append('prescriptions', {
          uri: image.uri,
          name: `prescription_${index}.jpg`,
          type: 'image/jpeg',
        } as any); // `as any` is needed for React Native FormData
      });

      const response = await fetch(`${ORDERS_BASE_URL}/upload-prescriptions`, {
        method: 'POST',
        headers: {
          Authorization: await getAccessToken() || '',
        },
        body: formData,
      });
      console.log('payload', JSON.stringify({
        method: 'POST',
        headers: {
          Authorization: await getAccessToken(),
        },
        body: formData,
      }));
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || 'Upload failed');
      }

      Alert.alert('Success', `Prescriptions uploaded successfully! ${JSON.stringify(result)}`);
      setSelectedImages([]);
    } catch (error: any) {
      console.error('Upload Error:', error);
      Alert.alert('Upload Failed', error.message || 'Unknown error occurred');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select Prescriptions" onPress={pickImages} />

      <ScrollView horizontal style={styles.imageScroll}>
        {selectedImages.map((img, idx) => (
          <Image
            key={idx}
            source={{ uri: img.uri }}
            style={styles.imagePreview}
          />
        ))}
      </ScrollView>

      <Button
        title={uploading ? 'Uploading...' : 'Submit Prescriptions'}
        onPress={handleSubmit}
        disabled={uploading}
        color="#4CAF50"
      />
    </View>
  );
};

export default UploadPrescriptionScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  imageScroll: {
    marginVertical: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
});
