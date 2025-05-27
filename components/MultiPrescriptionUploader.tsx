import React, { useState } from "react";
import {
	View,
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	Modal,
	Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ORDERS_BASE_URL } from "@/lib/values";
import { useStorageState } from "@/hooks/useStorageState";
import { getAccessToken } from "@/lib/SessionProvider";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";


const UploadPrescriptionScreen = () => {
	const router = useRouter();
	
	const [selectedImages, setSelectedImages] = useState<
		ImagePicker.ImagePickerAsset[]
	>([]);
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

	const takePhoto = async () => {
		const result = await ImagePicker.launchCameraAsync({
			quality: 1,
		});

		if (!result.canceled) {
			setSelectedImages([...selectedImages, ...result.assets]);
		}
	};

	const removeImage = (index: number) => {
		const updated = [...selectedImages];
		updated.splice(index, 1);
		setSelectedImages(updated);
	};

	const handleSubmit = async () => {
		if (selectedImages.length === 0) {
			Alert.alert("No images selected");
			return;
		}

		setUploading(true);

		try {
			const formData = new FormData();
			formData.append("user_name", username || "");

			selectedImages.forEach((image, index) => {
				formData.append("prescriptions", {
					uri: image.uri,
					name: `prescription_${index}.jpg`,
					type: "image/jpeg",
				} as any);
			});

			const response = await fetch(`${ORDERS_BASE_URL}/upload-prescriptions`, {
				method: "POST",
				headers: {
					Authorization: (await getAccessToken()) || "",
				},
				body: formData,
			});

			const result  = await response.json();

			if (!response.ok) {
				throw new Error(result?.message || "Upload failed");
			}
			console.log('result', result)
			router.push({ pathname: "/cart", params: { urls: JSON.stringify(result.prescription_urls) } })

			Alert.alert("Success", "Prescriptions uploaded successfully!");
			console.log('result', result)
			setSelectedImages([]);
		} catch (error: any) {
			console.error("Upload Error:", error);
			Alert.alert("Upload Failed", error.message || "Unknown error occurred");
		} finally {
			setUploading(false);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.heading}>Upload Your Prescription</Text>

			<TouchableOpacity style={styles.button} onPress={pickImages}>
				<Text style={styles.buttonText}>Select from Gallery</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.buttonSecondary} onPress={takePhoto}>
				<Text style={styles.buttonText}>Take Photo</Text>
			</TouchableOpacity>

			<ScrollView
				horizontal
				style={styles.imageScroll}
				contentContainerStyle={styles.imageScrollContent}
				showsHorizontalScrollIndicator={false}
			>
				{selectedImages.map((img, idx) => (
					<View key={idx} style={styles.imageWrapper}>
						<Image source={{ uri: img.uri }} style={styles.imagePreview} />
						<TouchableOpacity
							style={styles.removeButton}
							onPress={() => removeImage(idx)}
						>
							<Ionicons name="close-circle" size={24} color="red" />
						</TouchableOpacity>
					</View>
				))}
			</ScrollView>

			<TouchableOpacity
				style={[
					styles.button,
					uploading || selectedImages.length === 0
						? styles.disabledButton
						: null,
				]}
				onPress={handleSubmit}
				disabled={uploading || selectedImages.length === 0}
			>
				<Text style={styles.buttonText}>Submit Prescriptions</Text>
			</TouchableOpacity>

			<Modal visible={uploading} transparent animationType="fade">
				<View style={styles.overlay}>
					<ActivityIndicator size="large" color="#fff" />
					<Text style={styles.overlayText}>Uploading...</Text>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

export default UploadPrescriptionScreen;

const styles = StyleSheet.create({
	container: {
		// padding: 20,
		flex: 1,
		// backgroundColor: "#fff",
	},
	heading: {
		fontSize: 22,
		fontWeight: "600",
		marginBottom: 20,
		color: "#333",
	},
	button: {
		backgroundColor: "#4CAF50",
		paddingVertical: 14,
		paddingHorizontal: 20,
		borderRadius: 10,
		alignItems: "center",
		marginVertical: 8,
	},
	buttonSecondary: {
		backgroundColor: "#2196F3",
		paddingVertical: 14,
		paddingHorizontal: 20,
		borderRadius: 10,
		alignItems: "center",
		marginBottom: 16,
	},
	disabledButton: {
		backgroundColor: "#A5D6A7",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	imageScroll: {
		marginBottom: 20,
	},
	imageScrollContent: {
		alignItems: "center",
	},
	imageWrapper: {
		position: "relative",
		marginRight: 15,
	},
	imagePreview: {
		width: 160,
		height: 160,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#ccc",
	},
	removeButton: {
		position: "absolute",
		top: 5,
		right: 5,
		backgroundColor: "#fff",
		borderRadius: 12,
	},
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.7)",
		justifyContent: "center",
		alignItems: "center",
	},
	overlayText: {
		color: "#fff",
		fontSize: 18,
		marginTop: 10,
	},
});
