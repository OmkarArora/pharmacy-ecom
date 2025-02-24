import { OnboardingItemType } from "@/lib/types";
import { Image } from "expo-image";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

type Props = {
	data: OnboardingItemType;
};

export default function OnboardingItem({ data }: Props) {
	const { title, image, description } = data;

	const { width, height } = useWindowDimensions();

	return (
		<View style={[styles.container, { width, height }]}>
			<Image
				source={image}
				style={[styles.image, { width }]}
				contentFit="contain"
			/>

			<View style={{ flex: 0.3 }}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>{description}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		flex: 0.7,
		justifyContent: "center",
	},
	title: {
		fontWeight: "800",
		fontSize: 28,
		marginBottom: 10,
		color: "red",
		textAlign: "center",
	},
	description: {
		fontWeight: "300",
		// fontSize: 28,
		color: "blue",
		textAlign: "center",
		paddingHorizontal: 64,
	},
});
