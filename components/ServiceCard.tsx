import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

export default function ServiceCard({ heading }: { heading: string }) {
	return (
		<View style={styles.container}>
			<Image
				source={"https://placehold.co/70"}
				style={{ width: 70, height: 70, borderRadius: 8.25 }}
			/>
			<Text style={styles.text} numberOfLines={1}>
				{heading}
			</Text>
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
		maxWidth: 70,
	},
	text: {
		color: "#878787",
		fontWeight: "semibold",
		fontSize: 12,
		textAlign: "center",
	},
});
