import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Modal,
	ScrollView,
	Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useAddressStore } from "@/lib/store/address-store";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function AddressForm({
	isVisible,
	onClose,
}: {
	isVisible: boolean;
	onClose: () => void;
}) {
	const { addAddress } = useAddressStore();
	const [showMap, setShowMap] = useState(false);
	const [formData, setFormData] = useState({
		nickname: "",
		street: "",
		city: "",
		state: "",
		zipCode: "",
		latitude: 37.78825,
		longitude: -122.4324,
	});

	const primaryColor = useThemeColor({}, "primary");

	const handleLocationSelect = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();
		console.log("LOCATION STATUS", status);
		if (status !== "granted") {
			Alert.alert("Permission to access location was denied");
			return;
		}

		const location = await Location.getCurrentPositionAsync({});

		console.log("LOCATION", location);

		setFormData({
			...formData,
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
		});
		setShowMap(true);
	};

	const handleSubmit = () => {
		addAddress(formData);
		setFormData({
			nickname: "",
			street: "",
			city: "",
			state: "",
			zipCode: "",
			latitude: 37.78825,
			longitude: -122.4324,
		});
		setShowMap(false);
		onClose();
	};

	return (
		<Modal visible={isVisible} animationType="slide">
			<SafeAreaView style={{ flex: 1 }}>
				<ScrollView style={styles.container}>
					<Text style={styles.title}>Add New Address</Text>

					<View style={styles.form}>
						<TextInput
							style={styles.input}
							placeholder="Nickname (e.g., Home, Work)"
							value={formData.nickname}
							onChangeText={(text) =>
								setFormData({ ...formData, nickname: text })
							}
							autoCapitalize="words"
						/>

						<TextInput
							style={styles.input}
							placeholder="Street Address"
							value={formData.street}
							onChangeText={(text) =>
								setFormData({ ...formData, street: text })
							}
							autoCapitalize="words"
						/>

						<TextInput
							style={styles.input}
							placeholder="City"
							value={formData.city}
							onChangeText={(text) => setFormData({ ...formData, city: text })}
							autoCapitalize="words"
						/>

						<TextInput
							style={styles.input}
							placeholder="State"
							value={formData.state}
							onChangeText={(text) => setFormData({ ...formData, state: text })}
							autoCapitalize="words"
						/>

						<TextInput
							style={styles.input}
							placeholder="ZIP Code"
							value={formData.zipCode}
							onChangeText={(text) =>
								setFormData({ ...formData, zipCode: text })
							}
							keyboardType="numeric"
						/>

						<TouchableOpacity
							style={styles.locationButton}
							onPress={handleLocationSelect}
						>
							<Text style={styles.locationButtonText}>
								Select Location on Map
							</Text>
						</TouchableOpacity>

						{showMap && (
							<View style={styles.mapContainer}>
								<MapView
									style={styles.map}
									initialRegion={{
										latitude: formData.latitude,
										longitude: formData.longitude,
										latitudeDelta: 0.0922,
										longitudeDelta: 0.0421,
									}}
									onPress={(e) =>
										setFormData({
											...formData,
											latitude: e.nativeEvent.coordinate.latitude,
											longitude: e.nativeEvent.coordinate.longitude,
										})
									}
								>
									<Marker
										coordinate={{
											latitude: formData.latitude,
											longitude: formData.longitude,
										}}
									/>
								</MapView>
							</View>
						)}

						<TouchableOpacity
							style={[styles.submitButton, { backgroundColor: primaryColor }]}
							onPress={handleSubmit}
						>
							<Text style={styles.submitButtonText}>Save Address</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.cancelButton} onPress={onClose}>
							<Text style={styles.cancelButtonText}>Cancel</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</SafeAreaView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#f5f5f5",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 24,
		color: "#333",
	},
	form: {
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
		fontSize: 16,
	},
	locationButton: {
		backgroundColor: "#4CAF50",
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 16,
	},
	locationButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	mapContainer: {
		height: 300,
		marginBottom: 16,
		borderRadius: 8,
		overflow: "hidden",
	},
	map: {
		flex: 1,
	},
	submitButton: {
		backgroundColor: "#2196f3",
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 8,
	},
	submitButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	cancelButton: {
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
	},
	cancelButtonText: {
		color: "#666",
		fontSize: 16,
	},
});
