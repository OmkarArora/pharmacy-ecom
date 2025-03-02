import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

export default function CategoryCard({ heading }: { heading: string }) {
	return (
		<View style={styles.container}>
			<Image
				source={"https://placehold.co/100"}
				style={{ width: "100%", aspectRatio: 89 / 90, borderRadius: 8.25 }}
			/>
			<Text style={styles.text}>{heading}</Text>
		</View>
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
