import { CategoryType } from "@/lib/hooks/category/useCategories";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CategoryCard({ data }: { data: CategoryType }) {
	const router = useRouter();
	const { name, image } = data;

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => router.push(`/category/${name}`)}
		>
			<Image
				source={image || "https://placehold.co/100"}
				style={{ width: "100%", aspectRatio: 89 / 90, borderRadius: 8.25 }}
			/>
			<Text style={styles.text}>{name}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 5,
		paddingHorizontal: 2,
		paddingTop: 4,
		paddingBottom: 3,
		alignItems: "center",
		flex: 1,
	},
	text: {
		color: "#878787",
		fontWeight: "semibold",
		fontSize: 16,
	},
});
