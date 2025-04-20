import { useThemeColor } from "@/hooks/useThemeColor";
import useCartStore from "@/lib/store/cart-store";
import useToastStore from "@/lib/store/toast-store";
import { Product } from "@/lib/types";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

type Props = {
	data: Product;
};

export default function AddButton({ data }: Props) {
	const { product_id: productId } = data;

	const primaryColor = useThemeColor({}, "primary");
	const quantityInCart = useStore(
		useCartStore,
		useShallow((state) => state.selectProductQuantity(state, productId))
	);

	const addItemToCart = useCartStore((state) => state.addItem);
	const showToast = useToastStore((state) => state.show);
	const increaseQuantity = useCartStore((state) => state.increaseQuantity);
	const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
	const removeItem = useCartStore((state) => state.removeItem);

	function addToCart() {
		if (data) {
			addItemToCart(data);
			showToast("Added to Cart!");
		}
	}

	return (
		<View
			style={{
				height: 70,
				justifyContent: "center",
				alignItems: "center",
				paddingVertical: 10,
			}}
		>
			{quantityInCart === 0 && (
				<TouchableOpacity
					style={[
						styles.addToCartButton,
						{
							backgroundColor: primaryColor,
							width: "100%",
							height: "100%",
						},
					]}
					onPress={addToCart}
				>
					<Text style={styles.addToCartText}>Add to Cart</Text>
				</TouchableOpacity>
			)}

			{quantityInCart > 0 && (
				<>
					<View style={styles.itemQuantity}>
						{quantityInCart === 1 ? (
							<TouchableOpacity onPress={() => removeItem(productId)}>
								<MaterialIcons name="delete" size={18} />
							</TouchableOpacity>
						) : (
							<TouchableOpacity onPress={() => decreaseQuantity(productId)}>
								<MaterialIcons name="remove" size={18} />
							</TouchableOpacity>
						)}

						<Text style={styles.quantity}>{quantityInCart}</Text>
						<TouchableOpacity onPress={() => increaseQuantity(productId)}>
							<MaterialIcons name="add" size={18} />
						</TouchableOpacity>
					</View>
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	addToCartText: {
		fontSize: 16,
		color: "#fff",
		fontWeight: "bold",
		marginLeft: 8,
	},
	itemQuantity: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 20,
		borderWidth: 1,
		padding: 8,
		width: 100,
	},
	quantity: {
		marginHorizontal: 8,
		fontSize: 16,
	},
	addToCartButton: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#00AAFF",
		paddingVertical: 8,
		borderRadius: 8,
	},
});
