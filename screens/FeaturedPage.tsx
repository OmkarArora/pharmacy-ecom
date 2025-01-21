import React from "react";
import {
	View,
	Text,
	TextInput,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	SafeAreaView,
} from "react-native";

const FeaturedPage: React.FC = () => {
	// Sample data for products and brands
	const products = [
		{
			id: 1,
			name: "Nivea Body Milk Nourishing Lotion, 600 ml",
			price: "₹362",
			originalPrice: "₹724",
			discount: "50% off",
			image: "https://via.placeholder.com/150",
		},
		{
			id: 2,
			name: "Vaseline Intensive Care Deep Moisture Body Lotion",
			price: "₹324.5",
			originalPrice: "₹649",
			discount: "50% off",
			image: "https://via.placeholder.com/150",
		},
		// Add more products as needed
	];

	const brands = [
		{ id: 1, name: "NIVEA", image: "https://via.placeholder.com/80" },
		{ id: 2, name: "PAMPERS", image: "https://via.placeholder.com/80" },
		{ id: 3, name: "FAST&UP", image: "https://via.placeholder.com/80" },
		// Add more brands as needed
	];

	return (
		<ScrollView style={styles.container}>
			{/* Search Bar Section */}
			<View style={styles.header}>
				<Text style={styles.headerText}>Buy Medicines and Essentials</Text>
				<View style={styles.searchBar}>
					<TextInput
						placeholder="Search Medicines"
						style={styles.searchInput}
					/>
				</View>
			</View>

			{/* Discounted Products Section */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Minimum 50 Percent Off</Text>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					{products.map((product) => (
						<View key={product.id} style={styles.productCard}>
							<Image
								source={{ uri: product.image }}
								style={styles.productImage}
							/>
							<Text style={styles.productName}>{product.name}</Text>
							<View style={styles.priceRow}>
								<Text style={styles.price}>{product.price}</Text>
								<Text style={styles.originalPrice}>
									{product.originalPrice}
								</Text>
								<Text style={styles.discount}>{product.discount}</Text>
							</View>
							<TouchableOpacity style={styles.addButton}>
								<Text style={styles.addButtonText}>ADD</Text>
							</TouchableOpacity>
						</View>
					))}
				</ScrollView>
			</View>

			{/* Shop by Brand Section */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Shop By Brand</Text>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					{brands.map((brand) => (
						<View key={brand.id} style={styles.brandCard}>
							<Image source={{ uri: brand.image }} style={styles.brandImage} />
							<Text style={styles.brandName}>{brand.name}</Text>
						</View>
					))}
				</ScrollView>
			</View>
		</ScrollView>
	);
};

const hotSellers = [
	{
		id: "1",
		name: "Holland & Barrett Multivits & Iron for Fatigue, 120 Tablets",
		price: "₹249.8",
		originalPrice: "₹499.5",
		discount: "50% off",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "2",
		name: "Mamaearth Vitamin C Face Wash with Vitamin C &...",
		price: "₹249.8",
		originalPrice: "₹499",
		discount: "50% off",
		image: "https://via.placeholder.com/150",
	},
	// Add more items here
];

const categories = [
	{ id: "1", name: "Diabetes Care", icon: "🩺" },
	{ id: "2", name: "Cardiac Care", icon: "❤️" },
	{ id: "3", name: "Stomach Care", icon: "🍽️" },
	{ id: "4", name: "Pain Relief", icon: "💊" },
	// Add more categories here
];

const skincareProducts = [
	{
		id: "1",
		name: "CeraVe Moisturising Lotion 473 ml",
		price: "₹1440",
		originalPrice: "₹1600",
		discount: "10% off",
		image: "https://via.placeholder.com/150",
	},
	{
		id: "2",
		name: "CeraVe Foaming Cleanser 473 ml",
		price: "₹1395",
		originalPrice: "₹1550",
		discount: "10% off",
		image: "https://via.placeholder.com/150",
	},
	// Add more skincare products here
];

const FeaturePage = () => {
	const renderProduct = ({ item }: { item: any }) => (
		<View style={styles.productCard}>
			<Image source={{ uri: item.image }} style={styles.productImage} />
			<Text style={styles.productName}>{item.name}</Text>
			<Text style={styles.productPrice}>
				{item.price}{" "}
				<Text style={styles.originalPrice}>{item.originalPrice}</Text>
			</Text>
			<Text style={styles.discount}>{item.discount}</Text>
			<TouchableOpacity style={styles.addButton}>
				<Text style={styles.addButtonText}>ADD</Text>
			</TouchableOpacity>
		</View>
	);

	const renderCategory = ({ item }: { item: any }) => (
		<View style={styles.categoryCard}>
			<Text style={styles.categoryIcon}>{item.icon}</Text>
			<Text style={styles.categoryName}>{item.name}</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.sectionTitle}>Hot Sellers</Text>
			<FlatList
				data={hotSellers}
				horizontal
				renderItem={renderProduct}
				keyExtractor={(item) => item.id}
				showsHorizontalScrollIndicator={false}
			/>

			<Text style={styles.sectionTitle}>Browse by Health Conditions</Text>
			<FlatList
				data={categories}
				horizontal
				renderItem={renderCategory}
				keyExtractor={(item) => item.id}
				showsHorizontalScrollIndicator={false}
			/>

			<Text style={styles.sectionTitle}>Best Of Skincare By CeraVe</Text>
			<FlatList
				data={skincareProducts}
				horizontal
				renderItem={renderProduct}
				keyExtractor={(item) => item.id}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	productPrice: {
		fontSize: 14,
		color: "#28a745",
	},
	categoryIcon: {
		fontSize: 32,
		marginBottom: 8,
	},
	categoryName: {
		fontSize: 14,
		fontWeight: "bold",
	},
	categoryCard: {
		width: 100,
		alignItems: "center",
		marginRight: 16,
	},
	container: {
		flex: 1,
		backgroundColor: "#f8f8f8",
	},
	header: {
		backgroundColor: "#002D25", // Dark green background
		padding: 20,
		alignItems: "center",
	},
	headerText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 15,
	},
	searchBar: {
		backgroundColor: "#fff",
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 10,
		paddingVertical: 8,
		width: "100%",
	},
	searchInput: {
		fontSize: 14,
		color: "#333",
		flex: 1,
	},
	section: {
		marginTop: 20,
		paddingHorizontal: 15,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 10,
	},
	productCard: {
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 10,
		marginRight: 10,
		width: 160,
		alignItems: "center",
	},
	productImage: {
		width: 100,
		height: 100,
		marginBottom: 10,
	},
	productName: {
		fontSize: 12,
		color: "#333",
		marginBottom: 8,
		textAlign: "center",
	},
	priceRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	price: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#333",
		marginRight: 5,
	},
	originalPrice: {
		fontSize: 12,
		textDecorationLine: "line-through",
		color: "#888",
		marginRight: 5,
	},
	discount: {
		fontSize: 12,
		color: "#2e7d32",
	},
	addButton: {
		backgroundColor: "#004d40",
		paddingVertical: 5,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	addButtonText: {
		fontSize: 14,
		color: "#fff",
		textAlign: "center",
	},
	brandCard: {
		alignItems: "center",
		marginRight: 15,
	},
	brandImage: {
		width: 60,
		height: 60,
		marginBottom: 5,
		borderRadius: 30,
		backgroundColor: "#fff",
	},
	brandName: {
		fontSize: 12,
		color: "#333",
		textAlign: "center",
	},
});

export default FeaturedPage;
