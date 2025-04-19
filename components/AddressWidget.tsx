import Ionicons from "@expo/vector-icons/Ionicons";
import {
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
import { useState } from "react";
import AddressForm from "./address/AddressForm";
import { MapPin, Plus } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function AddressWidget() {
	const router = useRouter();

	const { addresses, selectedAddress, selectAddress } = useAddressStore();
	const [isSelectModalVisible, setIsSelectModalVisible] = useState(false);
	const [isFormVisible, setIsFormVisible] = useState(false);

	const primaryColor = useThemeColor({}, "primary");

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.locationIcon}
				// onPress={() => router.push("/address-book")}
				onPress={() => setIsSelectModalVisible(true)}
			>
				<Ionicons name="location-outline" size={20} color="black" />
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.addressContainer}
				// onPress={() => router.push("/address-book")}
				onPress={() => setIsSelectModalVisible(true)}
			>
				<Text
					style={{ color: "#c2c2c2", fontSize: 12, fontWeight: "semibold" }}
				>
					Delivery Address
				</Text>
				{!!selectedAddress ? (
					<Text
						style={{ color: "#838383", fontSize: 16, fontWeight: "semibold" }}
					>
						{selectedAddress?.nickname}
						{!!selectedAddress?.city && " - "}
						{selectedAddress?.city}
					</Text>
				) : (
					<Text
						style={{ color: "#838383", fontSize: 16, fontWeight: "semibold" }}
					>
						Add address
					</Text>
				)}
			</TouchableOpacity>

			<CartButton />

			<Modal
				visible={isSelectModalVisible}
				animationType="slide"
				onRequestClose={() => setIsSelectModalVisible(false)}
			>
				<SafeAreaView style={{ flex: 1 }}>
					<View style={styles.modalContainer}>
						<Text style={styles.modalTitle}>
							{addresses.length === 0 ? "Add a new address" : "Select Address"}
						</Text>

						<ScrollView style={styles.addressList}>
							{addresses.map((address) => (
								<TouchableOpacity
									key={address.id}
									style={[
										styles.addressItem,
										selectedAddress?.id === address.id &&
											styles.selectedAddress,
									]}
									onPress={() => {
										selectAddress(address);
										setIsSelectModalVisible(false);
									}}
								>
									<MapPin size={20} color="#666" />
									<View style={styles.addressDetails}>
										<Text style={styles.nickname}>{address.nickname}</Text>
										<Text style={styles.addressText}>
											{address.street}, {address.city}
										</Text>
									</View>
								</TouchableOpacity>
							))}
						</ScrollView>

						<TouchableOpacity
							style={[
								styles.addButton,
								{
									backgroundColor: primaryColor,
								},
							]}
							onPress={() => {
								setIsSelectModalVisible(false);
								setIsFormVisible(true);
							}}
						>
							<Plus size={24} color="#fff" />
							<Text style={styles.addButtonText}>Add New Address</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.closeButton}
							onPress={() => setIsSelectModalVisible(false)}
						>
							<Text style={styles.closeButtonText}>Close</Text>
						</TouchableOpacity>
					</View>
				</SafeAreaView>
			</Modal>

			<AddressForm
				isVisible={isFormVisible}
				onClose={() => setIsFormVisible(false)}
			/>
		</View>
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
		width: 32,
		height: 32,
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
