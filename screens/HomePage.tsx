import ProductCard from "@/components/product/ProductCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/lib/SessionProvider";
import { ProductItem } from "@/lib/types";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
	FlatList,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { clearStoredKeys } from "@/hooks/useStorageState";
import { LocalConfig } from "@/lib/values";

const DATA = [
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
		title: "First Item",
	},
	{
		id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
		title: "Second Item",
	},
	{
		id: "58694a0f-3da1-471f-bd96-145571e29d72n",
		title: "Third Item",
	},
	{
		id: "58694a0f-3da1-471f-bd96-145571e29d72t",
		title: "Third Item",
	},
	{
		id: "58694a0f-3da1-471f-bd96-145571e29d72e",
		title: "Third Item",
	},
	{
		id: "58694a0f-3da1-471f-bd96-145571e29d72w",
		title: "Third Item",
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba4",
		title: "First Item",
	},
	{
		id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f633",
		title: "Second Item",
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2",
		title: "First Item",
	},
	{
		id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f631mmmm",
		title: "Second Item",
	},
	{
		id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f633mmm",
		title: "Second Item",
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2mm",
		title: "First Item",
	},
	{
		id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f631m",
		title: "Second Item",
	},
];

interface Product {
	id: string;
	category: string;
	title: string;
	image: string;
	ratings?: number;
	price?: number;
	discount?: number;
	oldPrice?: number | null;
	reviews?: number;
	recentlyBought?: number;
	description?: string;
	healthConditions?: string[];
}

const products: Product[] = [
	{
		id: "1",
		category: "Product of the Day",
		title: "OZiva Shaker Green, 600 ml",
		image: "https://via.placeholder.com/150",
		ratings: 4.5,
		price: 499,
		discount: 3,
		oldPrice: 599,
		reviews: 100,
		recentlyBought: 200,
		description: "This is a description of the product",
	},
	{
		id: "2",
		category: "Product of the Day",
		title: "Apollo Life Biotin 5000 mcg, 60 Tablets",
		image: "https://via.placeholder.com/150",
		ratings: 4.5,
		price: 475,
		discount: 10,
		oldPrice: 525,
		reviews: 150,
		recentlyBought: 250,
		description: "This is a description of the product",
	},
	{
		id: "3",
		category: "browseByHealthCondition",
		title: "Cough & Cold",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "4",
		category: "browseByHealthCondition",
		title: "Diabetes",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "5",
		category: "browseByHealthCondition",
		title: "Cardiac Care",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "6",
		category: "browseByHealthCondition",
		title: "Stomach Care",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "7",
		category: "Top Brands",
		title: "Pantene Shampoo, 600 ml",
		image: "https://via.placeholder.com/150",
		ratings: 4.5,
		price: 499,
		discount: 3,
		oldPrice: 599,
		reviews: 100,
		recentlyBought: 200,
		description: "This is a description of the product",
	},
	{
		id: "8",
		category: "Top Brands",
		title: "VLCC Ayurveda Deep Pore Cleansing Face Wash",
		image: "https://via.placeholder.com/150",
		ratings: 4.5,
		price: 130,
		discount: 3,
		oldPrice: 150,
		reviews: 120,
		recentlyBought: 180,
		description: "This is a description of the product",
	},
];

export default function HomePage() {
	const { signOut } = useSession();
	const router = useRouter();

	const renderCard = ({ item }: { item: Product }) => (
		<TouchableOpacity
			style={styles.card}
			onPress={() => {
				if (item.category === "browseByHealthCondition") {
					// navigation.navigate('ShopPage', { healthCondition: item.title })
					console.error("Route not handled");
					// router.push(`/ShopPage`)
				} else {
					router.push(`/products/${item.id}`);
				}
			}}
		>
			<Image source={{ uri: item.image }} style={styles.cardImage} />
			<Text style={styles.cardTitle}>{item.title}</Text>
			{item.price !== null && item.price !== undefined && (
				<>
					<Text style={styles.cardPrice}>₹{item.price.toFixed(2)}</Text>
					{item.oldPrice !== null && item.oldPrice !== undefined && (
						<Text style={styles.cardOriginalPrice}>
							₹{item.oldPrice.toFixed(2)}
						</Text>
					)}
					{item.discount !== null && item.discount !== undefined && (
						<Text style={styles.cardDiscount}>{item.discount}% off</Text>
					)}
				</>
			)}
		</TouchableOpacity>
	);

	const renderSectionHeader = ({ section }: { section: any }) => (
		<View>
			<Text style={styles.categoryTitle}>{section.title}</Text>
			{section.promotion && <Text style={styles.promotionTag}>Promotion</Text>}
		</View>
	);

	const groupedProducts = [
		{
			title: "Product of the Day",
			data: products.filter(
				(product) => product.category === "Product of the Day"
			),
			horizontal: true,
		},
		{
			title: "Browse by Health Condition",
			data: products.filter(
				(product) => product.category === "browseByHealthCondition"
			),
			horizontal: false,
		},
		{
			title: "Top Brands",
			data: products.filter((product) => product.category === "Top Brands"),
			horizontal: true,
		},
	];

	const renderSection = ({ item }: { item: any }) => {
		if (item.horizontal) {
			return (
				<View>
					{renderSectionHeader({ section: item })}
					<FlatList
						data={item.data}
						renderItem={renderCard}
						keyExtractor={(product) => product.id}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.horizontalList}
					/>
				</View>
			);
		} else {
			return (
				<View>
					{renderSectionHeader({ section: item })}
					<FlatList
						data={item.data}
						renderItem={renderCard}
						keyExtractor={(product) => product.id}
						numColumns={2}
						columnWrapperStyle={styles.columnWrapper}
					/>
				</View>
			);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={groupedProducts}
				renderItem={renderSection}
				keyExtractor={(section) => section.title}
				ListHeaderComponent={
					<View style={styles.promotionSection}>
						<Text style={styles.categoryTitle}>Promotion</Text>
						<View style={styles.promotionCard}>
							{/* Add promotional content here */}
							<Text style={styles.promotionText}>Exclusive Offer!</Text>
							<Text style={styles.promotionDescription}>
								Get 20% off on all products this week!
							</Text>
						</View>
					</View>
				}
				ListFooterComponent={
					<View style={styles.footer}>
						<Text style={styles.footerText}>End of List</Text>
					</View>
				}
				ListHeaderComponentStyle={styles.promotionHeader}
				ListFooterComponentStyle={styles.footerStyle}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 10,
	},
	categoryTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginTop: 20,
		marginBottom: 10,
	},
	promotionTag: {
		fontSize: 14,
		color: "orange",
		marginBottom: 10,
	},
	card: {
		backgroundColor: "#f9f9f9",
		borderRadius: 10,
		margin: 5,
		padding: 10,
		alignItems: "center",
		justifyContent: "center",
		width: 150,
	},
	cardImage: {
		width: 100,
		height: 100,
		resizeMode: "contain",
	},
	cardTitle: {
		fontSize: 16,
		fontWeight: "bold",
		marginTop: 10,
	},
	cardPrice: {
		fontSize: 14,
		color: "green",
		marginTop: 5,
	},
	cardOriginalPrice: {
		fontSize: 12,
		color: "gray",
		textDecorationLine: "line-through",
	},
	cardDiscount: {
		fontSize: 12,
		color: "red",
	},
	promotionSection: {
		marginBottom: 20,
	},
	promotionCard: {
		backgroundColor: "#ffe0b2",
		borderRadius: 10,
		padding: 15,
		alignItems: "center",
	},
	promotionText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#e65100",
	},
	promotionDescription: {
		fontSize: 14,
		color: "#6d4c41",
	},
	horizontalList: {
		flexDirection: "row",
		paddingEnd: 10,
	},
	columnWrapper: {
		justifyContent: "space-between",
	},
	footer: {
		alignItems: "center",
		paddingVertical: 20,
	},
	footerText: {
		fontSize: 16,
		color: "#888",
	},
	promotionHeader: {
		marginBottom: 20,
	},
	footerStyle: {
		marginTop: 20,
	},
});
