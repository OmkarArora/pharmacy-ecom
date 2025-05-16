import React from "react";
import {
	View,
	Text,
	TextInput,
	ScrollView,
	StyleSheet,
	Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Searchpage: React.FC = () => {
	// Sample data
	const trendingSearches = [
		"Nutrigro",
		"OZiva",
		"Pampers",
		"Optimum Nutrition",
		"Prohance",
		"Huggies",
		"Wellbeing Nutrition",
		"Holland & Barrett",
		"Isopure",
		"Nivea",
		"Revital",
	];

	const recommendedProducts = [
		{
			id: 1,
			name: "D-Rise 60K Capsule 4's",
			image: "https://via.placeholder.com/150",
		},
		{
			id: 2,
			name: "Limcee 500 mg Chewable",
			image: "https://via.placeholder.com/150",
		},
		{
			id: 3,
			name: "Nasoclear Saline Nasal",
			image: "https://via.placeholder.com/150",
		},
		{
			id: 4,
			name: "Shelcal-500 Tablet 15's",
			image: "https://via.placeholder.com/150",
		},
		// Add more products if needed
	];

	const { top } = useSafeAreaInsets();

	return (
		<ScrollView style={{ ...styles.container, paddingTop: top }}>
			{/* Search Bar */}
			<View style={styles.searchContainer}>
				<TextInput
					style={styles.searchInput}
					placeholder="Search Medicines, Brands And More"
				/>
			</View>

			{/* Trending Searches */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Trending Searches</Text>
				<View style={styles.trendingContainer}>
					{trendingSearches.map((item, index) => (
						<View key={index} style={styles.trendingItem}>
							<Text style={styles.trendingText}>{item}</Text>
						</View>
					))}
				</View>
			</View>

			{/* Recommended Products */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Recommended Products</Text>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					{recommendedProducts.map((product) => (
						<View key={product.id} style={styles.productCard}>
							<Image
								source={{ uri: product.image }}
								style={styles.productImage}
							/>
							<Text style={styles.productName}>{product.name}</Text>
						</View>
					))}
				</ScrollView>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f8f8f8",
		paddingHorizontal: 15,
		paddingVertical: 10,
	},
	searchContainer: {
		backgroundColor: "#e6f7f6",
		borderRadius: 10,
		padding: 10,
	},
	searchInput: {
		fontSize: 14,
		color: "#555",
	},
	section: {
		marginTop: 20,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 10,
	},
	trendingContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	trendingItem: {
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 20,
		paddingHorizontal: 15,
		paddingVertical: 5,
		marginRight: 10,
		marginBottom: 10,
	},
	trendingText: {
		fontSize: 12,
		color: "#555",
	},
	prescriptionContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	prescriptionCard: {
		flex: 1,
		backgroundColor: "#e8f5e9",
		borderRadius: 10,
		padding: 15,
		marginRight: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	prescriptionText: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#2e7d32",
	},
	discountText: {
		fontSize: 12,
		color: "#2e7d32",
		marginTop: 5,
	},
	noPrescriptionCard: {
		flex: 1,
		backgroundColor: "#fff3e0",
		borderRadius: 10,
		padding: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	noPrescriptionText: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#e65100",
	},
	noPrescriptionSubText: {
		fontSize: 12,
		color: "#e65100",
		marginTop: 5,
		textAlign: "center",
	},
	productCard: {
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 10,
		alignItems: "center",
		marginRight: 10,
		width: 120,
	},
	productImage: {
		width: 100,
		height: 100,
		marginBottom: 10,
	},
	productName: {
		fontSize: 12,
		color: "#555",
		textAlign: "center",
	},
});

export default Searchpage;
