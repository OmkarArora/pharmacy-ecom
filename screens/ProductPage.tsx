import React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView,
	ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProductReviews from "./ProductReview";

import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/Header";
import { getDiscountedPrice } from "@/lib/functions";
import AddButton from "@/components/product/AddButton";
import useProductDetails from "@/lib/hooks/useProductDetails";

const ProductPage = ({ productId }: { productId: string }) => {
	const { data: product, isLoading } = useProductDetails(productId);

	if (isLoading) {
		return (
			<SafeAreaView style={{ flex: 1, paddingHorizontal: 16 }}>
				<ActivityIndicator style={{ padding: 20 }} />
			</SafeAreaView>
		);
	}

	if (!product)
		return (
			<SafeAreaView style={{ flex: 1, paddingHorizontal: 16 }}>
				<Header />
				<Text>Product not found</Text>
			</SafeAreaView>
		);

	return (
		<SafeAreaView style={{ flex: 1, paddingHorizontal: 16 }}>
			<Header />
			<ScrollView style={styles.container}>
				{/* Product Image */}
				<Image source={{ uri: product.image }} style={styles.productImage} />

				{/* Product Title */}
				<Text style={styles.title}>{product.name}</Text>
				<Text style={styles.title}>{product.category}</Text>

				{/* Rating Section */}
				{!!product.rating_count && (
					<View style={styles.ratingContainer}>
						<Text style={styles.rating}>{product.rating_count}</Text>
						<Ionicons name="star" size={16} color="#FFD700" />
						<Text style={styles.ratingText}>({product.reviews} Ratings)</Text>
					</View>
				)}

				{/* Recently Bought */}
				{!!product.recentlyBought && (
					<Text style={styles.recentlyBought}>
						{product.recentlyBought} people bought this recently
					</Text>
				)}

				{/* Price Section */}
				<View style={styles.priceContainer}>
					<View>
						<Text style={styles.oldPrice}>MRP ₹{product.price}</Text>
						<Text style={styles.discount}>{product.discount}%</Text>
					</View>
					<Text style={styles.newPrice}>
						₹{getDiscountedPrice(product.price, product.discount || 0)}
					</Text>
				</View>
				<Text style={styles.inclusive}>Inclusive of all taxes</Text>
				<Text style={styles.inclusive}>Description {product.description}</Text>

				<AddButton data={product} />

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
		marginTop: 10,
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
		paddingVertical: 14,
		borderRadius: 8,
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
		justifyContent: "center",
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
