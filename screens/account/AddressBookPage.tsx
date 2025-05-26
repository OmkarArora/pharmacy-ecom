import Header from "@/components/Header";
import React, { useState } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	FlatList,
	Alert,
	TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAddress from "@/lib/hooks/address/useAddress";
import AddressForm from "@/components/address/AddressForm";
import { Address } from "@/lib/store/address-store";

export default function AddressBookPage() {
	const { addressQuery, deleteAddressMutation } = useAddress();
	const { data } = addressQuery;
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [editingAddress, setEditingAddress] = useState<Address | null>(null);

	function onClickDelete(address_id: string) {
		deleteAddressMutation.mutate(address_id, {
			onSuccess: () => {
				addressQuery.refetch();
			},
			onError: (error) => {
				console.error("Delete failed:", error);
				Alert.alert("Error", "Failed to delete the address. Please try again.");
			},
		});
	}

	const handleEdit = (address: Address) => {
		setEditingAddress(address);
		setIsFormVisible(true);
	};

	const renderAddress = ({ item }: any) => (
		<View style={styles.addressItem}>
			<Text style={styles.label}>
				{item.line1}
				{item.line2 ? `, ${item.line2}` : ""}
				{`, ${item.city}, ${item.state} - ${item.pincode}`}
			</Text>
			<View style={styles.buttonRow}>
				<TouchableOpacity
					style={styles.roundButton}
					onPress={() => handleEdit(item)}
				>
					<Text style={styles.buttonText}>Edit</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.roundButton, styles.deleteButton]}
					onPress={() => onClickDelete(item.address_id)}
				>
					<Text style={[styles.buttonText, { color: "#fff" }]}>Delete</Text>
				</TouchableOpacity>
			</View>
		</View>
	);

	return (
		<SafeAreaView style={{ flex: 1 , backgroundColor : '#E6F5FB'}}>
			<View style={{ padding: 16 }}>
				<Header />
				<View style={styles.addressContainer}>
					<Text style={styles.heading}>Address Book</Text>
					<FlatList
						data={data}
						keyExtractor={(item) => item.address_id.toString()}
						renderItem={renderAddress}
						ListEmptyComponent={
							<Text style={styles.emptyText}>No addresses found.</Text>
						}
					/>
					<TouchableOpacity
						style={styles.addButton}
						onPress={() => setIsFormVisible(true)}
					>
						<Text style={styles.addButtonText}>Add New Address</Text>
					</TouchableOpacity>
				</View>
				<AddressForm
					isVisible={isFormVisible}
					onClose={() => {
						setIsFormVisible(false);
						setEditingAddress(null);
					}}
					initialData={editingAddress}
					onSuccess={() => {
						addressQuery.refetch();
					}}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	heading: {
		fontSize: 22,
		fontWeight: "700",
		marginBottom: 20,
		color: "#1a1a1a",
	},
	addressContainer: {
		paddingVertical: 20,
	},
	addressItem: {
		marginBottom: 16,
		padding: 16,
		backgroundColor: "#ffffff",
		borderRadius: 16,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		elevation: 3,
	},
	label: {
		fontSize: 16,
		color: "#333",
		marginBottom: 12,
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	roundButton: {
		backgroundColor: "#e0e0e0",
		paddingVertical: 8,
		paddingHorizontal: 20,
		borderRadius: 25,
	},
	deleteButton: {
		backgroundColor: "#d32f2f",
	},
	buttonText: {
		fontSize: 14,
		color: "#000",
		fontWeight: "500",
	},
	addButton: {
		backgroundColor: "#956D56",
		paddingVertical: 14,
		borderRadius: 30,
		alignItems: "center",
		marginTop: 20,
	},
	addButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	emptyText: {
		textAlign: "center",
		color: "#999",
		marginTop: 40,
		fontSize: 16,
	},
});
