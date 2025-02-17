import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Badge from "./Badge";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "zustand";
import useCartStore from "@/lib/store/cart-store";
import { useShallow } from "zustand/react/shallow";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Header() {
	const primaryColor = useThemeColor({}, "primary");
	const router = useRouter();

	const totalItemsInCart = useStore(
		useCartStore,
		useShallow((state) => state.selectTotalItemsCount(state))
	);

	function goToCart() {
		router.push("/cart");
	}

	function goBack() {
		router.back();
	}

	return (
		<View style={styles.header}>
			<TouchableOpacity onPress={goBack}>
				<Ionicons name="arrow-back" size={24} color="#000" />
			</TouchableOpacity>

			<TouchableOpacity onPress={goToCart}>
				<Ionicons name="cart-outline" size={24} color="#000" />
				<Badge
					count={totalItemsInCart}
					color={"white"}
					backgroundColor={primaryColor}
				/>
			</TouchableOpacity>
		</View>
	);
}
const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginVertical: 10,
		marginBottom: 20,
	},
});
