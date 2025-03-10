import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CartButton from "./CartButton";
import { useRouter } from "expo-router";

export default function AddressWidget() {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.locationIcon}
				onPress={() => router.push("/address-book")}
			>
				<Ionicons name="location-outline" size={20} color="black" />
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.addressContainer}
				onPress={() => router.push("/address-book")}
			>
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
			</TouchableOpacity>

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
