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

const products: ProductItem[] = [
	{
		id: "1",
		category: "productOfTheDay",
		title: "Product 1",
		image: "https://via.placeholder.com/150",
		price: 29.99,
		originalPrice: 39.99,
		discount: 20,
	},
	{
		id: "2",
		category: "topBrands",
		title: "Product 2",
		image: "https://via.placeholder.com/150",
		price: 49.99,
		originalPrice: 59.99,
		discount: 16,
	},
	{
		id: "3",
		category: "hotSellers",
		title: "Product 3",
		image: "https://via.placeholder.com/150",
		price: 19.99,
		originalPrice: 29.99,
		discount: 33,
	},
	{
		id: "4",
		category: "browseByHealthCondition",
		title: "Health Condition 1",
		image: "https://via.placeholder.com/150",
		price: null,
		originalPrice: null,
		discount: null,
	},
	{
		id: "5",
		category: "skinCare",
		title: "Product 4",
		image: "https://via.placeholder.com/150",
		price: 24.99,
		originalPrice: 34.99,
		discount: 28,
	},
];

export default function HomePage() {
	const { signOut } = useSession();
	const router = useRouter();

	const height = useBottomTabBarHeight();

	console.log("height", height);

	const renderCard = ({ item }: { item: ProductItem }) => (
		<TouchableOpacity
			style={styles.card}
			onPress={() => {
				// item.category === "browseByHealthCondition"
				// 	? router.push("Shop", { healthCondition: item.title })
				// 	: navigation.navigate("ProductDetail", { productId: item.id })
			}}
		>
			<Image source={{ uri: item.image }} style={styles.cardImage} />
			<Text style={styles.cardTitle}>{item.title}</Text>
			{item.price !== null && (
				<>
					<Text style={styles.cardPrice}>${item.price.toFixed(2)}</Text>
					<Text style={styles.cardOriginalPrice}>
						${item.originalPrice !== null ? item.originalPrice : "N/A"}
					</Text>
					{/*  {item.originalPrice?.toFixed(2) || 'N/A' */}
					<Text style={styles.cardDiscount}>{item.discount}% off</Text>
				</>
			)}
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<TouchableOpacity
					style={{ backgroundColor: "red" }}
					onPress={() => {
						clearStoredKeys([LocalConfig.IS_ONBOARDED]);
					}}
				>
					<Text style={{ color: "white", fontSize: 20 }}>
						Clear all stored values
					</Text>
				</TouchableOpacity>
				<FlatList
					data={products}
					renderItem={renderCard}
					keyExtractor={(item) => item.id}
					numColumns={2}
					ListHeaderComponent={
						<>
							<Text style={styles.categoryTitle}>Product of the Day</Text>
							<Text style={styles.promotionTag}>Promotion</Text>
						</>
					}
					ListFooterComponent={
						<>
							<Text style={styles.categoryTitle}>Top Brands</Text>
							<Text style={styles.promotionTag}>Promotion</Text>
						</>
					}
					columnWrapperStyle={styles.columnWrapper}
					ItemSeparatorComponent={() => <View style={styles.separator} />}
				/>
			</View>
		</SafeAreaView>
	);

	return (
		<SafeAreaView>
			<View style={styles.container}>
				<ThemedText
					onPress={() => {
						// The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
						signOut();
					}}
				>
					Sign Out
				</ThemedText>
				<ThemedText>{height}</ThemedText>

				<ThemedText>Home page</ThemedText>
				<FlatList
					data={DATA}
					renderItem={({ item }) => <ProductCard />}
					keyExtractor={(item) => item.id}
					numColumns={2}
					columnWrapperStyle={{ gap: 20 }}
					style={{
						// backgroundColor: "blue",
						width: "100%",
						paddingBottom: 100,
					}}
					contentContainerStyle={{
						// justifyContent: "center",
						alignItems: "center",
						// backgroundColor: "blue",
						paddingBottom: height + 80,
					}}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 10,
	},
	card: {
		backgroundColor: "#f9f9f9",
		borderRadius: 10,
		margin: 5,
		padding: 10,
		alignItems: "center",
		justifyContent: "center",
		width: "45%",
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
	columnWrapper: {
		justifyContent: "space-between",
	},
	separator: {
		height: 10,
	},
});
