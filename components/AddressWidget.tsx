import Ionicons from "@expo/vector-icons/Ionicons";
import {
	Alert,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import CartButton from "./CartButton";
import { useRouter } from "expo-router";
import { useAddressStore } from "@/lib/store/address-store";
import { useEffect, useState } from "react";
import AddressForm from "./address/AddressForm";
import { MapPin, Plus, Trash } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import useAddress from "@/lib/hooks/address/useAddress";

export default function AddressWidget() {
	const router = useRouter();

	const { selectedAddress } = useAddressStore();
	const [isSelectModalVisible, setIsSelectModalVisible] = useState(false);
	const [isFormVisible, setIsFormVisible] = useState(false);
	const { addressQuery } = useAddress();	

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.locationIcon}
				// onPress={() => router.push("/address-book")}
				onPress={() => setIsSelectModalVisible(true)}
			>
				<Ionicons name="location-outline" size={30} color="black" />
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.addressContainer}
				// onPress={() => router.push("/address-book")}
				onPress={() => setIsSelectModalVisible(true)}
			>
				<Text
					style={{ color: "#000000", fontSize: 12, fontWeight: "bold" }}
				>
					Delivery Address
				</Text>
				{!!selectedAddress ? (
					<Text
						style={{ color: "#000000", fontSize: 16, fontWeight: "semibold" }}
					>
						{selectedAddress?.type}
						{!!selectedAddress?.city && " - "}
						{selectedAddress?.city}
					</Text>
				) : (
					<Text
						style={{ color: "#000000", fontSize: 16, fontWeight: "semibold" }}
					>
						Add address
					</Text>
				)}
			</TouchableOpacity>

			<CartButton />

			<SelectAddressModal
				isVisible={isSelectModalVisible}
				isFormVisible={isFormVisible}
				setIsVisible={setIsSelectModalVisible}
				setIsFormVisible={setIsFormVisible}
				setIsSelectModalVisible={setIsSelectModalVisible}
			/>
			<AddressForm
				isVisible={isFormVisible}
				onClose={() => {
					setIsFormVisible(false)
				}}
				onSuccess={() => {
					addressQuery.refetch();
				}}	
			/>
		</View>
	);
}

export function SelectAddressModal({
	isVisible,
	isFormVisible,
	setIsVisible,
	setIsSelectModalVisible,
	setIsFormVisible
}: {
	isVisible: boolean;
	isFormVisible: boolean;
	setIsVisible: (val: boolean) => void;
	setIsSelectModalVisible: (val: boolean) => void;
	setIsFormVisible: (val: boolean) => void;
}) {
	const { selectedAddress, selectAddress } = useAddressStore();
	const primaryColor = useThemeColor({}, "primary");
	const { addressQuery, deleteAddressMutation } = useAddress();	
	const { data } = addressQuery;

	const removeAddress = useAddressStore((state) => state.removeAddress);

	function onClickDelete(address_id: string) {
	deleteAddressMutation.mutate(address_id, {
		onSuccess: () => {
			removeAddress(address_id);    
			addressQuery.refetch();    
		},
		onError: (error) => {
			console.error("Delete failed:", error);
			Alert.alert("Error", "Failed to delete the address. Please try again.");
		},
	});
}

	function onClickAdd(){
		setIsSelectModalVisible(false);
		setIsFormVisible(true);
	} 

	return (
		<Modal
			visible={isVisible}
			animationType="slide"
			onRequestClose={() => setIsVisible(false)}
		>
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.modalContainer}>
					<Text style={styles.modalTitle}>
						{data?.length === 0 ? "Add a new address" : "Select Address"}
					</Text>

					<ScrollView style={styles.addressList}>
						{data?.map((address) => (
							<View
								style={[
									styles.addressItem,
									selectedAddress?.address_id === address.address_id &&
										styles.selectedAddress,
								]}
								key={address.address_id}
							>
								<TouchableOpacity
									style={{
										flexDirection: "row",
										alignItems: "center",
										flexShrink: 1,
									}}
									onPress={() => {
										selectAddress(address);
										setIsVisible(false);
									}}
								>
									<MapPin size={20} color="#666" />
									<View style={styles.addressDetails}>
										<Text style={styles.nickname}>{address.type}</Text>
										<Text style={styles.addressText}>
											{address.line1}, {address.line2}, {address.city}
										</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity
									style={{ flexShrink: 0 }}
									onPress={() => onClickDelete(address.address_id)}
								>
									<Trash color={"red"} />
								</TouchableOpacity>
							</View>
						))}
					</ScrollView>

					<TouchableOpacity
						style={[
							styles.addButton,
							{
								backgroundColor: primaryColor,
							},
						]}
						onPress={onClickAdd}
					>
						<Plus size={24} color="#fff" />
						<Text style={styles.addButtonText}>Add New Address</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.closeButton}
						onPress={() => setIsVisible(false)}
					>
						<Text style={styles.closeButtonText}>Close</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		paddingVertical: 13,
		paddingHorizontal: 9,
	},
	locationIcon: {
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#eaf6fa",
		borderRadius: 100,
		borderWidth: 1,
		borderColor: "black",
	},
	addressContainer: {
		flex: 1,
	},

	selector: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		backgroundColor: "#fff",
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	selectorText: {
		marginLeft: 12,
		fontSize: 16,
		color: "#333",
	},
	modalContainer: {
		flex: 1,
		padding: 16,
		backgroundColor: "#f5f5f5",
	},
	modalTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
		color: "#333",
	},
	addressList: {
		flex: 1,
	},
	addressItem: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		backgroundColor: "#fff",
		borderRadius: 8,
		marginBottom: 8,
	},
	selectedAddress: {
		backgroundColor: "#e3f2fd",
	},
	addressDetails: {
		marginLeft: 12,
		flex: 1,
	},
	nickname: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#333",
	},
	addressText: {
		fontSize: 14,
		color: "#666",
		marginTop: 4,
	},
	addButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#2196f3",
		padding: 16,
		borderRadius: 8,
		marginTop: 16,
	},
	addButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
		marginLeft: 8,
	},
	closeButton: {
		alignItems: "center",
		padding: 16,
		marginTop: 8,
	},
	closeButtonText: {
		color: "#666",
		fontSize: 16,
	},
});
