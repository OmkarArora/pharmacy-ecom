import React from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	TouchableOpacity,
} from "react-native";

export default function CustomerCheckOut() {
	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
		>
			<ScrollView contentContainerStyle={styles.container}>
				<Text style={styles.heading}>Checkout</Text>

				<View style={styles.section}>
					<Text style={styles.label}>First Name *</Text>
					<TextInput style={styles.input} placeholder="First Name" />

					<View style={styles.row}>
						<View style={styles.halfInputContainer}>
							<Text style={styles.label}>Last Name *</Text>
							<TextInput style={styles.input} placeholder="Last Name" />
						</View>
					</View>

					<View style={{ marginTop: 20 }}>
						<Text style={styles.label}>Country / Region *</Text>
						<TextInput style={styles.input} placeholder="Country" />
					</View>

					<View style={{ marginTop: 20 }}>
						<Text style={styles.label}>Street Address *</Text>
						<TextInput style={styles.input} placeholder="House number and street name" />
						<TextInput style={[styles.input, { marginTop: 10 }]} placeholder="Apartment, suite, etc. (optional)" />
					</View>

					<View style={{ marginTop: 20 }}>
						<Text style={styles.label}>Town / City *</Text>
						<TextInput style={styles.input} placeholder="Town or City" />
					</View>

					<View style={{ marginTop: 20 }}>
						<Text style={styles.label}>State *</Text>
						<TextInput style={styles.input} placeholder="State" />
					</View>

					<View style={{ marginTop: 20 }}>
						<Text style={styles.label}>PIN Code *</Text>
						<TextInput style={styles.input} placeholder="PIN Code" keyboardType="numeric" />
					</View>

					<View style={{ marginTop: 20 }}>
						<Text style={styles.label}>Phone *</Text>
						<TextInput style={styles.input} placeholder="Phone" keyboardType="phone-pad" />
					</View>

					<View style={{ marginTop: 20 }}>
						<Text style={styles.label}>Email Address *</Text>
						<TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
					</View>

					<View style={{ marginTop: 20 }}>
						<Text style={styles.label}>Create account password *</Text>
						<TextInput style={styles.input} placeholder="Password" secureTextEntry />
					</View>

					<View style={{ marginTop: 20 }}>
						<Text style={styles.label}>Order notes (optional)</Text>
						<TextInput
							style={[styles.input, { height: 100, textAlignVertical: "top" }]}
							placeholder="Notes about your order, e.g. special notes for delivery."
							multiline
						/>
					</View>

					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>Place Order</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: "#fff",
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
	},
	halfInputContainer: {
		flex: 1,
	},
	button: {
		backgroundColor: "#dd4c2d",
		padding: 16,
		borderRadius: 8,
		marginTop: 30,
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 16,
	},
});
