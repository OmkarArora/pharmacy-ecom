import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CategoryCard({ heading }: { heading: string }) {
	const router = useRouter();

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => router.push(`/category/${heading}`)}
		>
			<Image
				source={"https://placehold.co/100"}
				style={{ width: "100%", aspectRatio: 89 / 90, borderRadius: 8.25 }}
			/>
			<Text style={styles.text}>{heading}</Text>
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
		fontSize: 12,
	},
});
