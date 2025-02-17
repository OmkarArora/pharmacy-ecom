import Header from "@/components/Header";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddressBookPage() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ padding: 16 }}>
				<Header />
				<View style={styles.addressContainer}>
					<Text style={styles.heading}>Address Book</Text>
					<View style={styles.addressItem}>
						<Text style={styles.label}>123 Main St, Cityville</Text>
						<View style={styles.buttonRow}>
							<Button title="Edit" onPress={() => alert("Edit Address")} />
							<Button title="Delete" onPress={() => alert("Delete Address")} />
						</View>
					</View>
					<Button
						title="Add New Address"
						onPress={() => alert("Add Address")}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	heading: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
	},
	addressContainer: {
		padding: 20,
	},
	addressItem: {
		marginBottom: 15,
		padding: 15,
		backgroundColor: "#fff",
		borderRadius: 5,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
	},
	label: {
		fontSize: 16,
		marginBottom: 10,
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
});
