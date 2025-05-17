import Header from "@/components/Header";
import React, {  useState } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAddress from "@/lib/hooks/address/useAddress";
import AddressForm from "@/components/address/AddressForm";

export default function AddressBookPage() {
	const { addressQuery, deleteAddressMutation } = useAddress();
	const { data } = addressQuery;
	const [isFormVisible, setIsFormVisible] = useState(false);
		
	function onClickDelete(address_id: string) {
		console.log('hello');
		deleteAddressMutation.mutate(address_id);
		addressQuery.refetch();
	}

	const renderAddress = ({ item }: any) => (
		<View style={styles.addressItem}>
			<Text style={styles.label}>
				{item.line1}
				{item.line2 ? `, ${item.line2}` : ""}
				{`, ${item.city}, ${item.state} - ${item.pincode}`}
			</Text>
			<View style={styles.buttonRow}>
				<Button title="Edit" onPress={() => alert(`Edit ${item.address_id}`)} />
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
					}}
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
