import React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ProductReviews from "./ProductReview";
import { productsDB } from "@/lib/fake-data";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import useCartStore from "@/lib/store/cart-store";

import useToastStore from "@/lib/store/toast-store";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";
import Badge from "@/components/Badge";

const ProductPage = ({
	productId,
	onBack,
}: {
	productId: string;
	onBack: () => void;
}) => {
	const primaryColor = useThemeColor({}, "primary");
	const router = useRouter();
	const addItemToCart = useCartStore((state) => state.addItem);
	const showToast = useToastStore((state) => state.show);

	const increaseQuantity = useCartStore((state) => state.increaseQuantity);
	const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
	const removeItem = useCartStore((state) => state.removeItem);

	const quantityInCart = useStore(
		useCartStore,
		useShallow((state) => state.selectProductQuantity(state, productId))
	);

	const totalItemsInCart = useStore(
		useCartStore,
		useShallow((state) => state.selectTotalItemsCount(state))
	);

	const product = productsDB.find((item) => item.id === productId);

	function goToCart() {
		router.push("/cart");
	}

	function addToCart() {
		if (product) {
			addItemToCart(product);
			showToast("Added to Cart!");
		}
	}

	if (!product) return <Text>Product not found</Text>;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={styles.container}>
				{/* Header */}
				<View style={styles.header}>
					<TouchableOpacity onPress={onBack}>
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

				{/* Product Image */}
				<Image source={{ uri: product.image }} style={styles.productImage} />

				{/* Product Title */}
				<Text style={styles.title}>{product.title}</Text>
				<Text style={styles.title}>{product.category}</Text>
				{/* Rating Section */}
				<View style={styles.ratingContainer}>
					<Text style={styles.rating}>{product.ratings}</Text>
					<Ionicons name="star" size={16} color="#FFD700" />
					<Text style={styles.ratingText}>({product.reviews} Ratings)</Text>
				</View>

				{/* Recently Bought */}
				<Text style={styles.recentlyBought}>
					{product.recentlyBought} people bought this recently
				</Text>

				{/* Price Section */}
				<View style={styles.priceContainer}>
					<View>
						<Text style={styles.oldPrice}>MRP ₹{product.originalPrice}</Text>
						<Text style={styles.discount}>{product.discountPercent}%</Text>
					</View>
					<Text style={styles.newPrice}>₹{product.price}</Text>
				</View>
				<Text style={styles.inclusive}>Inclusive of all taxes</Text>
				<Text style={styles.inclusive}>Description {product.description}</Text>

				{/* Add to Cart */}
				{quantityInCart === 0 && (
					<TouchableOpacity
						style={[styles.addToCartButton, { backgroundColor: primaryColor }]}
						onPress={addToCart}
					>
						<Ionicons name="add" size={16} color="#fff" />
						<Text style={styles.addToCartText}>Add to Cart</Text>
					</TouchableOpacity>
				)}

				{quantityInCart > 0 && (
					<>
						<View style={styles.itemQuantity}>
							{quantityInCart === 1 ? (
								<TouchableOpacity onPress={() => removeItem(product.id)}>
									<MaterialIcons name="delete" size={30} />
								</TouchableOpacity>
							) : (
								<TouchableOpacity onPress={() => decreaseQuantity(product.id)}>
									<MaterialIcons name="remove-circle-outline" size={30} />
								</TouchableOpacity>
							)}

							<Text style={styles.quantity}>{quantityInCart}</Text>
							<TouchableOpacity onPress={() => increaseQuantity(product.id)}>
								<MaterialIcons name="add-circle-outline" size={30} />
							</TouchableOpacity>
						</View>
					</>
				)}

				{/* Product Details */}
				<View style={styles.detailsContainer}>
					<Text style={styles.detailsHeading}>Product Details</Text>
					<Text style={styles.detailsDescription}>{product.description}</Text>
				</View>

				<ProductReviews />
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingHorizontal: 16,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginVertical: 10,
	},
	productImage: {
		width: "100%",
		height: 200,
		resizeMode: "contain",
		marginVertical: 20,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginVertical: 10,
		textAlign: "center",
	},
	ratingContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 10,
	},
	rating: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#000",
	},
	ratingText: {
		fontSize: 14,
		color: "#666",
		marginLeft: 4,
	},
	recentlyBought: {
		textAlign: "center",
		fontSize: 14,
		color: "#00AA00",
		marginVertical: 8,
	},
	priceContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginVertical: 10,
	},
	oldPrice: {
		fontSize: 14,
		color: "#999",
		textDecorationLine: "line-through",
	},
	discount: {
		fontSize: 14,
		color: "#FF5733",
	},
	newPrice: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#000",
	},
	inclusive: {
		fontSize: 12,
		color: "#666",
		textAlign: "left",
	},
	addToCartButton: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#00AAFF",
		paddingVertical: 12,
		borderRadius: 8,
		marginVertical: 16,
	},
	addToCartText: {
		fontSize: 16,
		color: "#fff",
		fontWeight: "bold",
		marginLeft: 8,
	},
	detailsContainer: {
		backgroundColor: "#f9f9f9",
		padding: 16,
		borderRadius: 8,
		marginVertical: 20,
	},
	detailsHeading: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 8,
	},
	detailsDescription: {
		fontSize: 14,
		color: "#666",
	},
	itemQuantity: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
		marginVertical: 10,
	},
	quantity: {
		marginHorizontal: 8,
		fontSize: 16,
	},
	badgeContainer: {
		position: "absolute",
		top: -4,
		right: -4,
	},
});

export default ProductPage;
