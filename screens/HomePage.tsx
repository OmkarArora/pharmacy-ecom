import ProductCard from "@/components/product/ProductCard";

import { Product } from "@/lib/types";
import {
	FlatList,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { productsDB } from "@/lib/fake-data";
import AddressWidget from "@/components/AddressWidget";
import { IconSymbol } from "@/components/ui/IconSymbol";
import ServiceCard from "@/components/ServiceCard";
import Spacer from "@/components/ui/spacer";
import CategoryCard from "@/components/CategoryCard";
import useCategories from "@/lib/hooks/category/useCategories";

const products: Product[] = [...productsDB];

export default function HomePage() {
	const router = useRouter();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
				<AddressWidget />

				<Spacer height={10} />

				<TouchableOpacity
					onPress={() => router.push("/search")}
					style={{
						backgroundColor: "#FDFDFD",
						padding: 16,
						borderRadius: 19,
						flexDirection: "row",
						gap: 16,
					}}
				>
					<IconSymbol size={20} name="magnifyingglass" color={"#303134"} />
					<Text
						style={{ fontWeight: "semibold", color: "#B7B7B7", fontSize: 15 }}
					>
						Search
					</Text>
				</TouchableOpacity>

				<Spacer height={20} />

				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ gap: 2 }}
				>
					<ServiceCard heading="Medicines" />
					<ServiceCard heading="Healthcare" />
					<ServiceCard heading="Lab Test" />
					<ServiceCard heading="Doctor Consultation" />
					<ServiceCard heading="Medicines" />
					<ServiceCard heading="Medicines" />
					<ServiceCard heading="Medicines" />
				</ScrollView>

				<Spacer height={10} />

				<Image
					source={"https://picsum.photos/id/123/400"}
					style={{
						// width: 300,
						// height: 300,
						aspectRatio: 312 / 176,
						// borderRadius: 0,
						// minHeight: 176,
						// backgroundColor: "red",
						width: "100%",
						// height: 400,
					}}
				/>

				<Spacer height={12} />

				<SubHeading heading="Shop by Category" />

				<Spacer height={5} />

				<CategoiesContainer />

				<Spacer height={12} />

				<SubHeading heading="Top Products" />

				<Spacer height={5} />

				<View
					style={{
						flex: 1,
						flexDirection: "row",
						flexWrap: "wrap",
						justifyContent: "center",
						gap: 10,
						paddingTop: 0,
						padding: 0,
					}}
				>
					{products.map((item) => (
						<View
							style={{
								flexBasis: "46%", // Use a percentage to allow for margins
								flexGrow: 0, // Prevent the item from growing
								flexShrink: 0, // Prevent the item from shrinking
								// backgroundColor: "#4CAF50",
								alignItems: "center",
								justifyContent: "center",
							}}
							key={item.product_id}
						>
							<ProductCard data={item} />
						</View>
					))}
				</View>

				<Spacer height={100} />
			</ScrollView>
		</SafeAreaView>
	);
}

function SubHeading({ heading }: { heading: string }) {
	const router = useRouter();

	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				paddingHorizontal: 9,
				paddingBottom: 6,
				paddingTop: 5,
				alignItems: "center",
			}}
		>
			<Text style={{ color: "#5B5B5B", fontWeight: "semibold", fontSize: 18 }}>
				{heading}
			</Text>
			<TouchableOpacity onPress={() => router.push("/search")}>
				<Text
					style={{ color: "#ACC6CA", fontWeight: "semibold", fontSize: 14 }}
				>
					See all
				</Text>
			</TouchableOpacity>
		</View>
	);
}

function CategoiesContainer() {
	const { data } = useCategories();

	if (!data || data.length === 0) return <></>;

	return (
		<View
			style={{
				gap: 5,
				justifyContent: "center",
				flexDirection: "row",
			}}
		>
			{data.map((item) => (
				<CategoryCard key={item.category_id} data={item} />
			))}
		</View>
	);
}

// function HomePageOld() {
// 	const { signOut } = useSession();
// 	const router = useRouter();

// 	const renderCard = ({ item }: { item: HomePageItem }) => {
// 		const isProductType = isProduct(item);

// 		// let renderData = isProductType
// 		// 	? (item as Product)
// 		// 	: (item as HomePageCategoryItem);

// 		return (
// 			<TouchableOpacity
// 				style={styles.card}
// 				onPress={() => {
// 					if (item.category === "browseByHealthCondition") {
// 						// navigation.navigate('ShopPage', { healthCondition: item.title })
// 						router.push("/products/2");

// 						console.error("Route not handled");
// 						// router.push(`/ShopPage`)
// 					} else {
// 						router.push(`/products/${item.productId}`);
// 					}
// 				}}
// 			>
// 				<Image
// 					source={item.image}
// 					style={styles.cardImage}
// 					contentFit="contain"
// 				/>
// 				<Text style={styles.cardTitle} numberOfLines={2}>
// 					{item.name}
// 				</Text>

// 				{isProductType && item.price !== null && item.price !== undefined && (
// 					<>
// 						<Text style={styles.cardPrice}>₹{item.price.toFixed(2)}</Text>
// 						{item.price !== null && item.price !== undefined && (
// 							<Text style={styles.cardOriginalPrice}>
// 								₹{item.price.toFixed(2)}
// 							</Text>
// 						)}
// 						{item.discount !== null && item.discount !== undefined && (
// 							<Text style={styles.cardDiscount}>{item.discount}% off</Text>
// 						)}
// 					</>
// 				)}
// 			</TouchableOpacity>
// 		);
// 	};

// 	const renderSectionHeader = ({ section }: { section: any }) => (
// 		<View>
// 			<Text style={styles.categoryTitle}>{section.title}</Text>
// 			{section.promotion && <Text style={styles.promotionTag}>Promotion</Text>}
// 		</View>
// 	);

// 	const groupedProducts = [
// 		{
// 			title: "Product of the Day",
// 			data: products.filter(
// 				(product) => product.category === "Product of the Day"
// 			),
// 			horizontal: true,
// 		},
// 		{
// 			title: "Browse by Health Condition",
// 			data: products.filter(
// 				(product) => product.category === "browseByHealthCondition"
// 			),
// 			horizontal: false,
// 		},
// 		{
// 			title: "Top Brands",
// 			data: products.filter((product) => product.category === "Top Brands"),
// 			horizontal: true,
// 		},
// 	];

// 	const renderSection = ({ item }: { item: any }) => {
// 		return (
// 			<View>
// 				{renderSectionHeader({ section: item })}
// 				<FlatList
// 					data={item.data}
// 					renderItem={renderCard}
// 					keyExtractor={(product) => product.productId}
// 					horizontal
// 					showsHorizontalScrollIndicator={false}
// 					contentContainerStyle={styles.horizontalList}
// 				/>
// 			</View>
// 		);

// 		// if (true) {
// 		// 	return (
// 		// 		<View>
// 		// 			{renderSectionHeader({ section: item })}
// 		// 			<FlatList
// 		// 				data={item.data}
// 		// 				renderItem={renderCard}
// 		// 				keyExtractor={(product) => product.productId}
// 		// 				horizontal
// 		// 				showsHorizontalScrollIndicator={false}
// 		// 				contentContainerStyle={styles.horizontalList}
// 		// 			/>
// 		// 		</View>
// 		// 	);
// 		// } else {
// 		// 	return (
// 		// 		<View>
// 		// 			{renderSectionHeader({ section: item })}
// 		// 			<FlatList
// 		// 				data={item.data}
// 		// 				renderItem={renderCard}
// 		// 				keyExtractor={(product) => product.id}
// 		// 				numColumns={3}
// 		// 				columnWrapperStyle={styles.columnWrapper}
// 		// 			/>
// 		// 		</View>
// 		// 	);
// 		// }
// 	};

// 	return (
// 		<SafeAreaView style={styles.container}>
// 			<FlatList
// 				data={groupedProducts}
// 				renderItem={renderSection}
// 				keyExtractor={(section) => section.title}
// 				ListHeaderComponent={
// 					<View style={styles.promotionSection}>
// 						<Text style={styles.categoryTitle}>Promotion</Text>
// 						<View style={styles.promotionCard}>
// 							{/* Add promotional content here */}
// 							<Text style={styles.promotionText}>Exclusive Offer!</Text>
// 							<Text style={styles.promotionDescription}>
// 								Get 20% off on all products this week!
// 							</Text>
// 						</View>
// 					</View>
// 				}
// 				ListFooterComponent={
// 					<View style={styles.footer}>
// 						<Text style={styles.footerText}>End of List</Text>
// 					</View>
// 				}
// 				ListHeaderComponentStyle={styles.promotionHeader}
// 				ListFooterComponentStyle={styles.footerStyle}
// 			/>
// 		</SafeAreaView>
// 	);
// }

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 10,
		paddingHorizontal: 16,
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
		textAlign: "center",
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
