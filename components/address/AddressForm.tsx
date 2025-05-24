import React, { useEffect, useState, useRef } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Modal,
	ScrollView,
	Alert,
	Platform,
} from "react-native";
import { WebView } from "react-native-webview"; 
import * as Location from "expo-location";
import {
	Address,
	getEmptyAddressObject,
	useAddressStore,
} from "@/lib/store/address-store";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useStorageState } from "@/hooks/useStorageState";
import useAddress from "@/lib/hooks/address/useAddress";
import { CircleAlert as AlertCircle } from "lucide-react-native";

export default function AddressForm({
	isVisible,
	onClose,
	onSuccess,
	initialData,
}: {
	isVisible: boolean;
	onClose: () => void;
	onSuccess?: () => void;
	initialData?: Address | null;
}) {
	const [[_, username]] = useStorageState("username");

	const { addAddress } = useAddressStore();
	const [showWebMap, setShowWebMap] = useState(false); // for webview map modal
	const [formData, setFormData] = useState<Address>({
		...getEmptyAddressObject(),
		user_name: username || "",
	});

	const { addAddressMutation } = useAddress();

	useEffect(() => {
		if (!!username) setFormData((prev) => ({ ...prev, user_name: username }));
	}, [username]);
	useEffect(() => {
		if (initialData) {
			setFormData(initialData);
		}
	}, [initialData, isVisible]);

	useEffect(() => {
		if (!isVisible) {
			// Reset form when modal closes
			setFormData({ ...getEmptyAddressObject(), user_name: username || "" });
			setErrors([]);
			setShowWebMap(false);
		}
	}, [isVisible]);

	const primaryColor = useThemeColor({}, "primary");

	const [errors, setErrors] = useState<string[]>([]);

	const [locationPermission, setLocationPermission] = useState<boolean | null>(
		null
	);

	useEffect(() => {
		checkLocationPermission();
	}, []);

	useEffect(() => {
		if (locationPermission) {
			grabCurrentLocation();
		}
	}, [locationPermission]);

	const checkLocationPermission = async () => {
		const { status } = await Location.getForegroundPermissionsAsync();
		setLocationPermission(status === "granted");
	};

	const requestLocationPermission = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();

		setLocationPermission(status === "granted");
	};

	const grabCurrentLocation = async () => {
		const location = await Location.getCurrentPositionAsync({});

		setFormData((prev) => ({
			...prev,
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
		}));
	};

	const handleLocationSelect = async () => {
		try {
			const { status } = await Location.requestForegroundPermissionsAsync();

			if (status !== "granted") {
				Alert.alert("Permission to access location was denied");
				return;
			}

			grabCurrentLocation();
			setShowWebMap(true); // Show web map modal instead of MapView
		} catch (error) {
			console.error("Error getting location", error);
			Alert.alert("Error getting location", "Please try again later.");
			setErrors((prevErrors) => [...prevErrors, `LOCATION ERROR: ${error}`]);
		}
	};

	const handleSubmit = () => {
		addAddress(formData);
		addAddressMutation.mutate(
			{ ...formData, is_default: true },
			{
				onSuccess: () => {
					setFormData({ ...getEmptyAddressObject(), user_name: username || "" });
					setShowWebMap(false);
					onClose(); // Close the modal
					onSuccess?.(); // Notify parent to refetch addresses
				},
				onError: (error) => {
					console.error("Failed to save address:", error);
					Alert.alert("Error", "Failed to save the address. Please try again.");
				},
			}
		);
	};

	// Handle message from webview with selected coordinates
	const onWebViewMessage = (event: any) => {
		try {
			const data = JSON.parse(event.nativeEvent.data);
			if (data.latitude && data.longitude) {
				setFormData((prev) => ({
					...prev,
					latitude: data.latitude,
					longitude: data.longitude,
				}));
				setShowWebMap(false); // Close the map modal after selection
			}
		} catch (err) {
			console.error("Failed to parse message from webview", err);
		}
	};

	// Google Maps API key: replace this with your real key
	const GOOGLE_MAPS_API_KEY = "AIzaSyAEEYcmZ5Bkx19VoKaViUI1bkBI7nfSxVg";

	// WebView HTML for Google Maps map picker
	const mapHtml = `
	<!DOCTYPE html>
	<html>
	<head>
		<title>Map Picker</title>
		<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
		<style> html, body, #map { height: 100%; margin: 0; padding: 0; } </style>
		<script src="https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}"></script>
		<script>
			let map;
			let marker;

			function initMap() {
				map = new google.maps.Map(document.getElementById('map'), {
					center: { lat: ${formData.latitude || 37.7749}, lng: ${formData.longitude || -122.4194} },
					zoom: 12,
				});

				map.addListener('click', (e) => {
					if (marker) marker.setMap(null);
					marker = new google.maps.Marker({
						position: e.latLng,
						map: map,
					});

					window.ReactNativeWebView.postMessage(JSON.stringify({
						latitude: e.latLng.lat(),
						longitude: e.latLng.lng(),
					}));
				});
			}
		</script>
	</head>
	<body onload="initMap()">
		<div id="map"></div>
	</body>
	</html>
	`;

	return (
		<Modal visible={isVisible} animationType="slide">
			<SafeAreaView style={{ flex: 1 }}>
				{locationPermission === null && (
					<View style={styles.container}>
						<Text style={styles.loadingText}>Checking location permissions...</Text>
					</View>
				)}
				{locationPermission === false && (
					<View style={styles.container}>
						<View style={styles.permissionContainer}>
							<AlertCircle size={48} color="#ff4444" style={styles.icon} />
							<Text style={styles.permissionTitle}>Location Access Required</Text>
							<Text style={styles.permissionText}>
								We need access to your location to provide accurate address
								information.
								{Platform.OS === "ios"
									? " Please enable location services in your device settings."
									: ""}
							</Text>
							{Platform.OS !== "ios" && (
								<TouchableOpacity
									style={styles.permissionButton}
									onPress={requestLocationPermission}
								>
									<Text style={styles.permissionButtonText}>Grant Permission</Text>
								</TouchableOpacity>
							)}
						</View>
					</View>
				)}
				{locationPermission && (
					<>
						<ScrollView style={styles.container}>
							<Text style={styles.title}>Add New Address</Text>

							<View style={styles.form}>
								<TextInput
									style={styles.input}
									placeholder="Type (e.g., Home, Work)"
									value={formData.type}
									onChangeText={(text) =>
										setFormData({ ...formData, type: text })
									}
									autoCapitalize="words"
								/>

								<TextInput
									style={styles.input}
									placeholder="Line 1"
									value={formData.line1}
									onChangeText={(text) =>
										setFormData({ ...formData, line1: text })
									}
									autoCapitalize="words"
								/>

								<TextInput
									style={styles.input}
									placeholder="Line 2"
									value={formData.line2}
									onChangeText={(text) =>
										setFormData({ ...formData, line2: text })
									}
									autoCapitalize="words"
								/>

								<TextInput
									style={styles.input}
									placeholder="City"
									value={formData.city}
									onChangeText={(text) =>
										setFormData({ ...formData, city: text })
									}
									autoCapitalize="words"
								/>

								<TextInput
									style={styles.input}
									placeholder="State"
									value={formData.state}
									onChangeText={(text) =>
										setFormData({ ...formData, state: text })
									}
									autoCapitalize="words"
								/>

								<TextInput
									style={styles.input}
									placeholder="ZIP Code"
									value={formData.pincode}
									onChangeText={(text) =>
										setFormData({ ...formData, pincode: text })
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

								{/* Show selected lat/lng for user info */}
								{formData.latitude && formData.longitude && (
									<Text style={{ marginBottom: 16 }}>
										Selected Coordinates: {formData.latitude.toFixed(5)},{" "}
										{formData.longitude.toFixed(5)}
									</Text>
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

							{errors.length > 0 && (
								<View style={{ marginTop: 16 }}>
									<Text style={{ color: "red", fontWeight: "bold" }}>Errors:</Text>
									{errors.map((error, index) => (
										<Text key={index} style={{ color: "red" }}>
											- {error}
										</Text>
									))}
								</View>
							)}
						</ScrollView>

						{/* WebView modal for map location picking */}
						<Modal visible={showWebMap} animationType="slide">
							<View style={{ flex: 1 }}>
								<WebView
									originWhitelist={["*"]}
									source={{ html: mapHtml }}
									onMessage={onWebViewMessage}
								/>
								<TouchableOpacity
									style={[styles.cancelButton, { backgroundColor: "#333" }]}
									onPress={() => setShowWebMap(false)}
								>
									<Text style={[styles.cancelButtonText, { color: "white" }]}>
										Cancel
									</Text>
								</TouchableOpacity>
							</View>
						</Modal>
					</>
				)}
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
		marginTop: 8,
	},
	cancelButtonText: {
		color: "#666",
		fontSize: 16,
	},
	loadingText: {
		fontSize: 16,
		color: "#666",
		textAlign: "center",
	},
	permissionContainer: {
		backgroundColor: "#fff",
		padding: 24,
		borderRadius: 12,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	icon: {
		marginBottom: 16,
	},
	permissionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 12,
		textAlign: "center",
	},
	permissionText: {
		fontSize: 16,
		color: "#666",
		textAlign: "center",
		marginBottom: 20,
		lineHeight: 24,
	},
	permissionButton: {
		backgroundColor: "#2196f3",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
	},
	permissionButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
});