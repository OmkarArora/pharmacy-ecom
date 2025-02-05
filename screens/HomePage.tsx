import ProductCard from "@/components/product/ProductCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/lib/SessionProvider";
import {
	HomePageCategoryItem,
	HomePageItem,
	isProduct,
	Product,
} from "@/lib/types";
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
import { homePageCategoryItemsDB, productsDB } from "@/lib/fake-data";

const products: HomePageItem[] = [...productsDB, ...homePageCategoryItemsDB];

export default function HomePage() {
	const { signOut } = useSession();
	const router = useRouter();

	const renderCard = ({ item }: { item: HomePageItem }) => {
		const isProductType = isProduct(item);

		// let renderData = isProductType
		// 	? (item as Product)
		// 	: (item as HomePageCategoryItem);

		return (
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
				<Image
					source={item.image}
					style={styles.cardImage}
					contentFit="contain"
				/>
				<Text style={styles.cardTitle}>{item.title}</Text>

				{isProductType && item.price !== null && item.price !== undefined && (
					<>
						<Text style={styles.cardPrice}>₹{item.price.toFixed(2)}</Text>
						{item.originalPrice !== null &&
							item.originalPrice !== undefined && (
								<Text style={styles.cardOriginalPrice}>
									₹{item.originalPrice.toFixed(2)}
								</Text>
							)}
						{item.discountPercent !== null &&
							item.discountPercent !== undefined && (
								<Text style={styles.cardDiscount}>
									{item.discountPercent}% off
								</Text>
							)}
					</>
				)}
			</TouchableOpacity>
		);
	};

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
