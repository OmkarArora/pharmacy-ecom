import { View, StyleSheet, Text } from "react-native";

import { Product } from "@/lib/types";
import { Image } from "expo-image";
import { Link } from "expo-router";

export default function ProductCard({ data }: { data: Product }) {
	const { image, name, description, price, discount, productId } = data;

	return (
		<Link href={`/products/${productId}`}>
			<View style={styles.card}>
				<Image
					source={
						image || "https://m.media-amazon.com/images/I/31CsUtgSdiL.jpg"
					}
					style={styles.image}
					contentFit="contain"
				/>
				<View style={{ paddingTop: 16, flexShrink: 1 }}>
					<Text style={styles.name}>{name}</Text>
					<Text numberOfLines={3} style={styles.description}>
						{description}
					</Text>

					<Text style={styles.price}>₹{price || 0}</Text>

					<Text style={styles.discount}>{discount}% off</Text>
				</View>
			</View>
		</Link>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		gap: 16,

		height: 200,
	},
	image: {
		borderRadius: 10,
		width: 200,
		height: 200,
	},
	name: {
		fontSize: 22,
		fontWeight: "600",
	},
	description: {
		fontSize: 14,
		marginTop: 4,
		color: "#ADB3BC",
	},
	price: {
		fontSize: 18,
		color: "gray",
		textDecorationLine: "line-through",
		marginTop: 10,
	},
	discount: {
		fontSize: 12,
		color: "red",
	},
});
