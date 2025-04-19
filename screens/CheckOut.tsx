import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
	ScrollView,
	Image,
	StyleSheet,
} from "react-native";

import { validateEmail, validatePhoneNumber } from "@/utils/validators";
import { processPayment } from "@/services/paymentService";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";

const Checkout = () => {
	const primaryColor = useThemeColor({}, "primary");

	const router = useRouter();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		country: "India",
		streetAddress: "",
		city: "",
		state: "",
		pinCode: "",
		phone: "",
		email: "",
		paymentMethod: "creditCard",
		orderNotes: "",
	});

	const handleInputChange = (field: string, value: string) => {
		setFormData({ ...formData, [field]: value });
	};

	const handleOrderPlacement = async () => {
		if (
			!formData.firstName ||
			!formData.lastName ||
			!formData.streetAddress ||
			!formData.city ||
			!formData.state ||
			!formData.pinCode ||
			!formData.phone ||
			!formData.email
		) {
			Alert.alert("Error", "All required fields must be filled.");
			return;
		}

		if (!validateEmail(formData.email)) {
			Alert.alert("Error", "Invalid email address.");
			return;
		}

		if (!validatePhoneNumber(formData.phone)) {
			Alert.alert("Error", "Invalid phone number.");
			return;
		}

		router.push("/payment");

		// try {
		// 	const response = await processPayment(formData);
		// 	if (response.success) {
		// 		Alert.alert("Success", "Order placed successfully!");
		// 	} else {
		// 		throw new Error(response.message);
		// 	}
		// } catch (error) {
		// 	const errMessage =
		// 		(error as Error).message || "An unexpected error occurred";
		// 	console.error("Payment Error:", errMessage);
		// }
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView>
				<Image
					source={require("../assets/images/icon.png")}
					style={{ width: 100, height: 100, alignSelf: "center" }}
				/>
				<Text
					style={{
						color: "#fff",
						fontSize: 24,
						fontWeight: "bold",
						textAlign: "center",
					}}
				>
					Checkout
				</Text>

				<TextInput
					placeholder="First Name *"
					value={formData.firstName}
					onChangeText={(text) => handleInputChange("firstName", text)}
					style={styles.input}
				/>
				<TextInput
					placeholder="Last Name *"
					value={formData.lastName}
					onChangeText={(text) => handleInputChange("lastName", text)}
					style={styles.input}
				/>
				<TextInput
					placeholder="Street Address *"
					value={formData.streetAddress}
					onChangeText={(text) => handleInputChange("streetAddress", text)}
					style={styles.input}
				/>
				<TextInput
					placeholder="City *"
					value={formData.city}
					onChangeText={(text) => handleInputChange("city", text)}
					style={styles.input}
				/>
				<TextInput
					placeholder="State *"
					value={formData.state}
					onChangeText={(text) => handleInputChange("state", text)}
					style={styles.input}
				/>
				<TextInput
					placeholder="PIN Code *"
					keyboardType="numeric"
					value={formData.pinCode}
					onChangeText={(text) => handleInputChange("pinCode", text)}
					style={styles.input}
				/>
				<TextInput
					placeholder="Phone *"
					keyboardType="phone-pad"
					value={formData.phone}
					onChangeText={(text) => handleInputChange("phone", text)}
					style={styles.input}
				/>
				<TextInput
					placeholder="Email *"
					keyboardType="email-address"
					value={formData.email}
					onChangeText={(text) => handleInputChange("email", text)}
					style={styles.input}
				/>
				<TextInput
					placeholder="Order Notes"
					value={formData.orderNotes}
					onChangeText={(text) => handleInputChange("orderNotes", text)}
					style={styles.input}
				/>

				{/* <Image
				source={require("../assets/payment-options.png")}
				style={{ width: "100%", height: 50, marginVertical: 10 }}
			/> */}

				<TouchableOpacity onPress={handleOrderPlacement}>
					<Text
						style={{
							color: "white",
							backgroundColor: "orange",
							padding: 10,
							textAlign: "center",
							borderRadius: 5,
						}}
					>
						Place Order
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderColor: "black",
		padding: 5,
		borderRadius: 5,
		fontSize: 16,
		marginBottom: 10,
	},
});

export default Checkout;
