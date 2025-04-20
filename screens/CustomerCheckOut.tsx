import FullScreenLoader from "@/components/FullScreenLoader";
import { PrimaryButton } from "@/components/ui/buttons";
import Spacer from "@/components/ui/spacer";
import usePlaceOrder from "@/lib/hooks/order/usePlaceOrder";
import { validateEmail, validatePhoneNumber } from "@/utils/validators";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	Alert,
	Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CustomerCheckOut() {
	const router = useRouter();

	const { placeOrder, isPending: isPlaceOrderPending } = usePlaceOrder();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		country: "India",
		streetAddress: "",
		streetAddressLine2: "",
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

		// router.push("/payment");

		placeOrder();

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
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<ScrollView contentContainerStyle={styles.container}>
					<Text style={styles.heading}>Checkout</Text>

					<View style={styles.section}>
						<Text style={styles.label}>First Name *</Text>
						<TextInput
							style={styles.input}
							placeholder="First Name"
							onChangeText={(text) => handleInputChange("firstName", text)}
						/>

						<View style={styles.row}>
							<View style={styles.halfInputContainer}>
								<Text style={styles.label}>Last Name *</Text>
								<TextInput
									style={styles.input}
									placeholder="Last Name"
									onChangeText={(text) => handleInputChange("lastName", text)}
								/>
							</View>
						</View>

						<View style={{ marginTop: 20 }}>
							<Text style={styles.label}>Country / Region *</Text>
							<TextInput style={styles.input} placeholder="Country" />
						</View>

						<View style={{ marginTop: 20 }}>
							<Text style={styles.label}>Street Address *</Text>
							<TextInput
								style={styles.input}
								placeholder="House number and street name"
								onChangeText={(text) =>
									handleInputChange("streetAddress", text)
								}
							/>
							<TextInput
								style={[styles.input, { marginTop: 10 }]}
								placeholder="Apartment, suite, etc. (optional)"
								onChangeText={(text) =>
									handleInputChange("streetAddressLine2", text)
								}
							/>
						</View>

						<View style={{ marginTop: 20 }}>
							<Text style={styles.label}>Town / City *</Text>
							<TextInput
								style={styles.input}
								placeholder="Town or City"
								onChangeText={(text) => handleInputChange("city", text)}
							/>
						</View>

						<View style={{ marginTop: 20 }}>
							<Text style={styles.label}>State *</Text>
							<TextInput
								style={styles.input}
								placeholder="State"
								onChangeText={(text) => handleInputChange("state", text)}
							/>
						</View>

						<View style={{ marginTop: 20 }}>
							<Text style={styles.label}>PIN Code *</Text>
							<TextInput
								style={styles.input}
								placeholder="PIN Code"
								keyboardType="numeric"
								onChangeText={(text) => handleInputChange("pinCode", text)}
							/>
						</View>

						<View style={{ marginTop: 20 }}>
							<Text style={styles.label}>Phone *</Text>
							<TextInput
								style={styles.input}
								placeholder="Phone"
								keyboardType="phone-pad"
								onChangeText={(text) => handleInputChange("phone", text)}
							/>
						</View>

						<View style={{ marginTop: 20 }}>
							<Text style={styles.label}>Email Address *</Text>
							<TextInput
								style={styles.input}
								placeholder="Email"
								keyboardType="email-address"
								onChangeText={(text) => handleInputChange("email", text)}
							/>
						</View>

						{/* <View style={{ marginTop: 20 }}>
							<Text style={styles.label}>Create account password *</Text>
							<TextInput
								style={styles.input}
								placeholder="Password"
								secureTextEntry
							/>
						</View> */}

						<View style={{ marginTop: 20 }}>
							<Text style={styles.label}>Order notes (optional)</Text>
							<TextInput
								style={[
									styles.input,
									{ height: 100, textAlignVertical: "top" },
								]}
								placeholder="Notes about your order, e.g. special notes for delivery."
								multiline
								onChangeText={(text) => handleInputChange("orderNotes", text)}
							/>
						</View>

						<Spacer height={20} />

						<PrimaryButton title="Place Order" onPress={handleOrderPlacement} />

						<Button
							title="Test Payment"
							onPress={() => {
								router.push("/payment");
							}}
						/>
					</View>
				</ScrollView>

				<FullScreenLoader
					visible={isPlaceOrderPending}
					text="Placing order..."
				/>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 20,
	},
	heading: {
		fontSize: 28,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 30,
	},
	section: {
		backgroundColor: "#0b1e2e",
		padding: 20,
		borderRadius: 10,
	},
	label: {
		color: "#fff",
		marginBottom: 6,
		fontWeight: "600",
	},
	input: {
		backgroundColor: "#fff",
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 10,
		marginTop: 20,
	},
	halfInputContainer: {
		flex: 1,
	},
});
