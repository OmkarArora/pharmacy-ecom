import React from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const reviews = [
	{
		id: 1,
		name: "Maisha",
		date: "August, 2022",
		rating: 2,
		review: "Mild granules. Not a scrub working on face as a face wash.",
	},
	{
		id: 2,
		name: "Urvashi B",
		date: "August, 2022",
		rating: 5,
		review:
			"Perfect for winter tanning as you tend to have it after sitting in sunlight. It works like magic, gives you shine.",
	},
	{
		id: 3,
		name: "Meenakshi Sharma",
		date: "August, 2022",
		rating: 5,
		review:
			"Very smooth and moisturising scrub. Beads are very smooth and soft for exfoliation and skin gets hydrated too. Has a very nice creamy texture.",
	},
];

const ProductReviews = () => {
	const renderStars = (count: number) => {
		return (
			<View style={{ flexDirection: "row" }}>
				{Array.from({ length: 5 }).map((_, index) => (
					<FontAwesome
						key={index}
						name={index < count ? "star" : "star-o"}
						size={16}
						color="#FFD700"
						style={{ marginRight: 2 }}
					/>
				))}
			</View>
		);
	};

	return (
		<View style={styles.container}>
			{/* Average Rating Section */}
			<View style={styles.ratingContainer}>
				<Text style={styles.averageRating}>4.5</Text>
				<FontAwesome name="star" size={20} color="#FFD700" />
				<Text style={styles.ratingText}>104 Ratings | 8 Reviews</Text>
				<View style={styles.ratingDistribution}>
					{[
						{ stars: 5, percentage: "72%" },
						{ stars: 4, percentage: "21%" },
						{ stars: 3, percentage: "3%" },
						{ stars: 2, percentage: "1%" },
						{ stars: 1, percentage: "3%" },
					].map((item) => (
						<View
							key={item.stars}
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginVertical: 4,
							}}
						>
							<Text style={{ marginRight: 8 }}>{item.stars} stars</Text>
							<View
								style={{
									flex: 1,
									backgroundColor: "#e0e0e0",
									height: 10,
									borderRadius: 5,
								}}
							>
								<View
									style={{
										backgroundColor: "#4caf50",
										height: "100%",
										width: `${parseFloat(item.percentage)}%`,
										borderRadius: 5,
									}}
								/>
							</View>
							<Text style={{ marginLeft: 8 }}>{item.percentage}</Text>
						</View>
					))}
				</View>
			</View>

			{/* Top Reviews Section */}
			<Text style={styles.sectionTitle}>Top Reviews</Text>

			{reviews.map((item) => (
				<View style={styles.reviewCard} key={item.id.toString()}>
					<View style={styles.reviewHeader}>
						<Text style={styles.reviewerName}>{item.name}</Text>
						<Text style={styles.reviewDate}>{item.date}</Text>
					</View>
					{renderStars(item.rating)}
					<Text style={styles.reviewText}>{item.review}</Text>
				</View>
			))}

			{/* <FlatList
        data={reviews}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>{item.name}</Text>
              <Text style={styles.reviewDate}>{item.date}</Text>
            </View>
            {renderStars(item.rating)}
            <Text style={styles.reviewText}>{item.review}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      /> */}

			{/* See All Reviews Button */}
			<TouchableOpacity style={styles.button}>
				<Text style={styles.buttonText}>See all reviews</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f9f9f9",
		padding: 16,
	},
	ratingContainer: {
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
		marginBottom: 16,
	},
	averageRating: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 4,
	},
	ratingText: {
		fontSize: 14,
		color: "#666",
		marginBottom: 12,
	},
	ratingDistribution: {
		marginTop: 8,
	},
	ratingRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 4,
	},
	starText: {
		fontSize: 14,
		color: "#333",
		marginRight: 4,
	},
	progressBar: {
		flex: 1,
		height: 6,
		backgroundColor: "#e0e0e0",
		borderRadius: 3,
		marginHorizontal: 8,
	},
	progressFill: {
		height: "100%",
		backgroundColor: "#4CAF50",
		borderRadius: 3,
	},
	percentage: {
		fontSize: 12,
		color: "#333",
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 12,
	},
	reviewCard: {
		backgroundColor: "#fff",
		padding: 12,
		borderRadius: 8,
		marginBottom: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	reviewHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 4,
	},
	reviewerName: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#333",
	},
	reviewDate: {
		fontSize: 12,
		color: "#666",
	},
	reviewText: {
		fontSize: 14,
		color: "#666",
		marginTop: 6,
	},
	button: {
		backgroundColor: "#4CAF50",
		padding: 12,
		borderRadius: 8,
		alignItems: "center",
		marginTop: 16,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default ProductReviews;
