import Header from "@/components/Header";
import React, {  useState } from "react";
import { View, Text, Button, StyleSheet, FlatList, Alert } from "react-native";
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
				<Button title="Edit" onPress={() => handleEdit(item)} />
				<Button title="Delete" onPress={() =>  onClickDelete(item.address_id)} />
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
						onPress={() => setIsFormVisible(true)}
					/>
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
