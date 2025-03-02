import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";
import CartButton from "./CartButton";

export default function AddressWidget() {
	return (
		<View style={styles.container}>
			<View style={styles.locationIcon}>
				<Ionicons name="location-outline" size={20} color="black" />
			</View>
			<View style={styles.addressContainer}>
				<Text
					style={{ color: "#c2c2c2", fontSize: 12, fontWeight: "semibold" }}
				>
					Delivery Address
				</Text>
				<Text
					style={{ color: "#838383", fontSize: 16, fontWeight: "semibold" }}
				>
					12 Rich Terrace, Wigram, NZ
				</Text>
			</View>

			<CartButton />
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
});
