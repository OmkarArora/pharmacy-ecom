import Header from "@/components/Header";
import React from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAddress from "@/lib/hooks/address/useAddress";

export default function AddressBookPage() {
	const { addressQuery } = useAddress();
	const { data } = addressQuery;

	const renderAddress = ({ item }: any) => (
		<View style={styles.addressItem}>
			<Text style={styles.label}>
				{item.line1}
				{item.line2 ? `, ${item.line2}` : ""}
				{`, ${item.city}, ${item.state} - ${item.pincode}`}
			</Text>
			<View style={styles.buttonRow}>
				<Button title="Edit" onPress={() => alert(`Edit ${item.id}`)} />
				<Button title="Delete" onPress={() => alert(`Delete ${item.id}`)} />
			</View>
		</View>
	);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ padding: 16 }}>
				<Header />
				<View style={styles.addressContainer}>
					<Text style={styles.heading}>Address Book</Text>
					<FlatList
						data={data}
						keyExtractor={(item) => item.address_id.toString()}
						renderItem={renderAddress}
					/>
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
