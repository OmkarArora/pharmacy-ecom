import { Image, View, StyleSheet, Text } from "react-native";
import { ThemedText } from "../ThemedText";

export default function ProductCard() {
	return (
		<View style={styles.card}>
			<Image
				source={{
					uri: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				}}
				width={142}
				height={146}
				style={styles.image}
			/>
			<ThemedText style={styles.text}>Paracetomol</ThemedText>
			<ThemedText style={styles.text}>stars</ThemedText>
			<ThemedText style={styles.text}>₹ 150</ThemedText>
			<ThemedText style={styles.text}>Add to cart</ThemedText>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		borderWidth: 1,
		borderColor: "red",
	},
	image: {
		borderRadius: 10,
		width: 142,
		height: 146,
	},
	text: {
		fontSize: 12,
	},
});
