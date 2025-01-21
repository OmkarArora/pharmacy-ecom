import React from "react";
import {
	View,
	Text,
	TextInput,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Image,
	ScrollView,
} from "react-native";
import {
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";

const ShopPage: React.FC = () => {
	const filters = {
		category: ["Biotin", "Face Serum", "Protein Powder"],
		brands: ["OZIVA", "Apollo Life", "Turma Boost"],
		price: ["₹0 - ₹500", "₹500 - ₹1000", "₹1000+"],
		discount: ["10% Off", "20% Off", "50% Off"],
	};

	const products = [
		{
			id: 1,
			name: "OZiva Shaker Green, 600 ml",
			price: "₹499",
			cashback: "₹15 cashback (3%)",
			image: "https://via.placeholder.com/150",
		},
		{
			id: 2,
			name: "Apollo Life Biotin 5000 mcg, 60 Tablets",
			price: "₹475",
			cashback: "₹48 cashback (10%)",
			image: "https://via.placeholder.com/150",
		},
		{
			id: 3,
			name: "Ozipan 500 Tablet 3's",
			price: "₹64.20",
			discount: "10% Off",
			image: "https://via.placeholder.com/150",
		},
		{
			id: 4,
			name: "Turma Boost Curcumin + Black Pepper, 10 Capsules",
			price: "₹198",
			cashback: "₹6 cashback (3%)",
			image: "https://via.placeholder.com/150",
		},
		{
			id: 5,
			name: "VLCC Ayurveda Deep Pore Cleansing Face Wash",
			price: "₹130",
			cashback: "₹4 cashback (3%)",
			image: "https://via.placeholder.com/150",
		},
	];

	const insets = useSafeAreaInsets();

	return (
		<View style={{ ...styles.container, paddingTop: insets.top }}>
			{/* Filters Section */}
			<View style={styles.filtersContainer}>
				{/* Filter Heading */}
				<Text style={styles.filtersTitle}>Filters</Text>

				{/* Filter Categories */}
				<View style={styles.filterSection}>
					<Text style={styles.filterHeading}>Category</Text>
					{filters.category.map((item, index) => (
						<TouchableOpacity key={index} style={styles.filterItem}>
							<Text>{item}</Text>
						</TouchableOpacity>
					))}
				</View>

				<View style={styles.filterSection}>
					<Text style={styles.filterHeading}>Brands</Text>
					{filters.brands.map((item, index) => (
						<TouchableOpacity key={index} style={styles.filterItem}>
							<Text>{item}</Text>
						</TouchableOpacity>
					))}
				</View>

				<View style={styles.filterSection}>
					<Text style={styles.filterHeading}>Price</Text>
					{filters.price.map((item, index) => (
						<TouchableOpacity key={index} style={styles.filterItem}>
							<Text>{item}</Text>
						</TouchableOpacity>
					))}
				</View>

				<View style={styles.filterSection}>
					<Text style={styles.filterHeading}>Discount</Text>
					{filters.discount.map((item, index) => (
						<TouchableOpacity key={index} style={styles.filterItem}>
							<Text>{item}</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>

			{/* Product List */}
			<View style={styles.productsContainer}>
				{/* Search Results Header */}
				<Text style={styles.searchResultsTitle}>
					200 search results for 'OZiva'
				</Text>

				<FlatList
					data={products}
					numColumns={2}
					keyExtractor={(item) => item.id.toString()}
					columnWrapperStyle={styles.productRow}
					renderItem={({ item }) => (
						<View style={styles.productCard}>
							<Image source={{ uri: item.image }} style={styles.productImage} />
							<Text style={styles.productName}>{item.name}</Text>
							{item.cashback && (
								<Text style={styles.cashbackText}>{item.cashback}</Text>
							)}
							{item.discount && (
								<Text style={styles.discountText}>{item.discount}</Text>
							)}
							<Text style={styles.productPrice}>{item.price}</Text>
							<TouchableOpacity style={styles.addButton}>
								<Text style={styles.addButtonText}>Add</Text>
							</TouchableOpacity>
						</View>
					)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "#f8f8f8",
	},
	filtersContainer: {
		width: "25%",
		backgroundColor: "#ffffff",
		padding: 10,
	},
	filtersTitle: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 10,
	},
	filterSection: {
		marginBottom: 15,
	},
	filterHeading: {
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 5,
	},
	filterItem: {
		paddingVertical: 5,
	},
	productsContainer: {
		width: "75%",
		padding: 10,
	},
	searchResultsTitle: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 10,
	},
	productRow: {
		justifyContent: "space-between",
	},
	productCard: {
		backgroundColor: "#ffffff",
		borderRadius: 10,
		padding: 10,
		marginBottom: 15,
		width: "48%",
		alignItems: "center",
	},
	productImage: {
		width: 100,
		height: 100,
		marginBottom: 10,
	},
	productName: {
		fontSize: 14,
		textAlign: "center",
		marginBottom: 5,
	},
	cashbackText: {
		fontSize: 12,
		color: "#2e7d32",
	},
	discountText: {
		fontSize: 12,
		color: "#e53935",
	},
	productPrice: {
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 10,
	},
	addButton: {
		backgroundColor: "#004d40",
		borderRadius: 5,
		paddingVertical: 5,
		paddingHorizontal: 20,
	},
	addButtonText: {
		color: "#ffffff",
		fontSize: 14,
	},
});

export default ShopPage;
