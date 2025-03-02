import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

export default function ServiceCard({ heading }: { heading: string }) {
	return (
		<View style={styles.container}>
			<Image
				source={"https://placehold.co/69x69"}
				style={{ width: 69, height: 69, borderRadius: 8.25 }}
			/>
			<Text style={styles.text}>{heading}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 6,
		paddingHorizontal: 6,
		paddingTop: 5,
		paddingBottom: 4,
		alignItems: "center",
	},
	text: {
		color: "#878787",
		fontWeight: "semibold",
		fontSize: 12,
	},
});
