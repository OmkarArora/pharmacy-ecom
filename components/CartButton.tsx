import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import Badge from "./Badge";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useStore } from "zustand";
import useCartStore from "@/lib/store/cart-store";
import { useShallow } from "zustand/react/shallow";
import { useRouter } from "expo-router";

export default function CartButton() {
	const primaryColor = useThemeColor({}, "primary");
	const router = useRouter();

	const totalItemsInCart = useStore(
		useCartStore,
		useShallow((state) => state.selectTotalItemsCount(state))
	);

	function goToCart() {
		router.push("/cart");
	}

	return (
		<TouchableOpacity onPress={goToCart}>
			<Ionicons name="bag-outline" size={24} color="#000" />
			<Badge
				count={totalItemsInCart}
				color={"white"}
				backgroundColor={primaryColor}
			/>
		</TouchableOpacity>
	);
}
