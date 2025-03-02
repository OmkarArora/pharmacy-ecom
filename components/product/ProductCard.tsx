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
					source={image || "https://placehold.co/100"}
					style={styles.image}
					contentFit="contain"
				/>
				<Text
					style={{
						fontWeight: "semibold",
						color: "#7E7E7E",
						fontSize: 14,
						maxWidth: 132,
						marginTop: 7,
					}}
					numberOfLines={4}
				>
					Everherb Giloy Tulsi Juice-Body Defence System
				</Text>

				<Text
					style={{
						color: "#C0C0C0",
						fontSize: 12,
						fontWeight: "semibold",
						marginTop: 5,
					}}
				>
					90 capsules
				</Text>

				{/* 7px spacer */}
			</View>
		</Link>
	);

	// return (
	// 	<Link href={`/products/${productId}`}>
	// 		<View style={styles.card}>
	// 			<Image
	// 				source={
	// 					image || "https://m.media-amazon.com/images/I/31CsUtgSdiL.jpg"
	// 				}
	// 				style={styles.image}
	// 				contentFit="contain"
	// 			/>
	// 			<View style={{ paddingTop: 16, flexShrink: 1 }}>
	// 				<Text style={styles.name}>{name}</Text>
	// 				<Text numberOfLines={3} style={styles.description}>
	// 					{description}
	// 				</Text>

	// 				<Text style={styles.price}>₹{price || 0}</Text>

	// 				<Text style={styles.discount}>{discount}% off</Text>
	// 			</View>
	// 		</View>
	// 	</Link>
	// );
}

const styles = StyleSheet.create({
	card: {},
	image: {
		borderRadius: 7,
		width: 132,
		height: 132,
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
