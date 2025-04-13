import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Alert,
	Platform,
} from "react-native";
import RazorpayCheckout from "react-native-razorpay";

const MoneyTransfer: React.FC = () => {
	const [recipientName, setRecipientName] = useState("");
	const [amount, setAmount] = useState("");

	const handleTransfer = async () => {
		if (!recipientName || parseFloat(amount) <= 0) {
			Alert.alert("Invalid input", "Please enter valid recipient name and amount.");
			return;
		}

		try {
			// 1. Call your backend to create an order
			const response = await fetch("http://127.0.0.1:3000/create-order", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ amount: parseInt(amount) * 100, currency: "INR" }), // Razorpay expects paise
			});
			const data = await response.json();

			if (!data.success) {
				Alert.alert("Error", "Failed to create order.");
				return;
			}

			// 2. Open Razorpay Checkout
			const options = {
				description: `Transfer to ${recipientName}`,
				image: require("../assets/icon.png"), // your logo (optional)
				currency: "INR",
				key: "rzp_live_IhNOGiPLQYapWG", // Replace with your key
				amount: data.amount,
				name: "Money Transfer Service",
				order_id: data.orderId,
				prefill: {
					email: "test@example.com",
					contact: "9876543210",
					name: recipientName,
				},
				theme: { color: "#2193b0" },
			};

			RazorpayCheckout.open(options)
				.then(async (paymentData) => {
					// 3. Verify Payment
					const verifyRes = await fetch("http://127.0.0.1:3000/verify-payment", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(paymentData),
					});
					const verifyJson = await verifyRes.json();

					if (verifyJson.success) {
						Alert.alert("Success", "Payment successful!");
					} else {
						Alert.alert("Error", "Payment verification failed.");
					}
				})
				.catch((error: any) => {
					console.log("Payment error:", error);
					Alert.alert("Error", "Payment was cancelled or failed.");
				});
		} catch (err) {
			console.error(err);
			Alert.alert("Error", "Something went wrong.");
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<Text style={styles.title}>Money Transfer</Text>
				<Text style={styles.subtitle}>
					Enter recipient's details and transfer amount below:
				</Text>

				<TextInput
					style={styles.input}
					placeholder="Recipient Name"
					value={recipientName}
					onChangeText={setRecipientName}
					placeholderTextColor="#aaa"
				/>

				<TextInput
					style={styles.input}
					placeholder="Amount to Transfer (₹)"
					value={amount}
					onChangeText={setAmount}
					keyboardType="numeric"
					placeholderTextColor="#aaa"
				/>

				<TouchableOpacity style={styles.button} onPress={handleTransfer}>
					<Text style={styles.buttonText}>Transfer Now</Text>
				</TouchableOpacity>

				<Text style={styles.note}>Secure and instant transfers.</Text>
			</View>
		</View>
	);
};

export default MoneyTransfer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#2193b0",
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	card: {
		backgroundColor: "#fff",
		padding: 30,
		borderRadius: 10,
		width: "100%",
		maxWidth: 400,
		elevation: 5,
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 5,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 10,
		color: "#333",
	},
	subtitle: {
		textAlign: "center",
		fontSize: 14,
		marginBottom: 20,
		color: "#555",
	},
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 6,
		padding: 12,
		marginVertical: 10,
		color: "#000",
	},
	button: {
		backgroundColor: "#2193b0",
		padding: 15,
		borderRadius: 6,
		marginTop: 10,
	},
	buttonText: {
		color: "#fff",
		textAlign: "center",
		fontSize: 16,
		fontWeight: "bold",
	},
	note: {
		textAlign: "center",
		marginTop: 15,
		fontSize: 13,
		color: "#666",
	},
});
