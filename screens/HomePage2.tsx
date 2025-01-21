import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	TextInput,
	SafeAreaView,
} from "react-native";

const categories = [
	{ name: "Medicines", icon: "🏥" },
	{ name: "Personal Care", icon: "🧴" },
	{ name: "Vitamins", icon: "💊" },
	{ name: "First Aid", icon: "🩹" },
];

const featuredProducts = [
	{ name: "Paracetamol", price: "$5.99", description: "Pain Relief" },
	{ name: "Vitamin C", price: "$12.99", description: "1000mg Tablets" },
	{ name: "Band-Aid Pack", price: "$4.99", description: "Assorted Sizes" },
];

export default function HomeScreen() {
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View style={styles.content}>
					{/* Search Bar */}
					<TextInput
						style={styles.searchBar}
						placeholder="Search medicines..."
						value={searchQuery}
						onChangeText={setSearchQuery}
					/>

					{/* Categories */}
					<Text style={styles.sectionTitle}>Categories</Text>
					<View style={styles.categoriesContainer}>
						{categories.map((category, index) => (
							<TouchableOpacity
								key={index}
								style={styles.categoryCard}
								onPress={() => alert(`Selected ${category.name}`)}
							>
								<Text style={styles.categoryIcon}>{category.icon}</Text>
								<Text style={styles.categoryName}>{category.name}</Text>
							</TouchableOpacity>
						))}
					</View>

					{/* Featured Products */}
					<Text style={styles.sectionTitle}>Featured Products</Text>
					{featuredProducts.map((product, index) => (
						<TouchableOpacity
							key={index}
							style={styles.productCard}
							onPress={() => alert(`Selected ${product.name}`)}
						>
							<Text style={styles.productName}>{product.name}</Text>
							<Text style={styles.productDescription}>
								{product.description}
							</Text>
							<Text style={styles.productPrice}>{product.price}</Text>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	content: {
		padding: 16,
	},
	searchBar: {
		backgroundColor: "white",
		padding: 12,
		borderRadius: 8,
		marginBottom: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 12,
	},
	categoriesContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	categoryCard: {
		width: "48%",
		backgroundColor: "#e6f0ff",
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 8,
	},
	categoryIcon: {
		fontSize: 32,
		marginBottom: 8,
	},
	categoryName: {
		fontSize: 14,
		fontWeight: "500",
	},
	productCard: {
		backgroundColor: "white",
		padding: 16,
		borderRadius: 8,
		marginBottom: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	productName: {
		fontSize: 16,
		fontWeight: "bold",
	},
	productDescription: {
		color: "#666",
		marginTop: 4,
	},
	productPrice: {
		color: "#4299e1",
		fontWeight: "bold",
		marginTop: 8,
	},
});
