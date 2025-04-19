import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import { Product } from "@/lib/types";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Spacer from "../ui/spacer";
import { getDiscountedPrice } from "@/lib/functions";
import { RUPEE_SYMBOL } from "@/lib/values";
import AddButton from "./AddButton";

export default function ProductCard({ data }: { data: Product }) {
	const {
		image,
		name,
		description,
		price,
		discount,
		product_id,
		rating_count,
	} = data;

	const router = useRouter();
	// href={`/products/${productId}`}
	return (
		<TouchableOpacity
			onPress={() => {
				router.push(`/products/${product_id}`);
			}}
			style={{ flex: 1 }}
		>
			<View style={styles.card}>
				<Image
					source={image || "https://placehold.co/100"}
					style={styles.image}
					contentFit="cover"
				/>
				<Text
					style={{
						fontWeight: "semibold",
						color: "#808080",
						fontSize: 14,

						marginTop: 7,
					}}
					numberOfLines={4}
				>
					{name || "Everherb Giloy Tulsi Juice-Body Defence System"}
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

				<Spacer height={7} />
				{!!rating_count && (
					<View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
						<RatingPill rating={rating_count} />
						<Text
							style={{ color: "#A8A8A8", fontSize: 11, fontWeight: "semibold" }}
						>
							{"("}150 Reviews{")"}
						</Text>
					</View>
				)}

				<View
					style={{
						marginTop: 10,
						flexDirection: "row",
						alignItems: "center",
						gap: 5,
					}}
				>
					<Text style={{ color: "#646464" }}>
						{RUPEE_SYMBOL}
						{getDiscountedPrice(price, discount || 0)}
					</Text>
					<Text style={{ color: "#C9C9C9" }}>
						{RUPEE_SYMBOL}
						{price}
					</Text>
				</View>

				<View style={{ flex: 1 }} />

				<View style={{ paddingVertical: 4 }}>
					<AddButton data={data} />
				</View>
			</View>
		</TouchableOpacity>
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

function RatingPill({ rating }: { rating: number }) {
	return (
		<View
			style={{
				flexDirection: "row",
				gap: "2px",
				alignItems: "center",
				backgroundColor: "#d2ebf5",
				borderRadius: 20,
				padding: 4,
				paddingHorizontal: 8,
			}}
		>
			<FontAwesome name="star" size={15} color="#8BB8BF" />
			<Text style={{ fontSize: 14, color: "#8BB8BF" }}>{rating}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
	},
	image: {
		borderRadius: 7,
		width: "100%",
		aspectRatio: 1,
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
