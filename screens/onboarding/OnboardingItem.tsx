import { useThemeColor } from "@/hooks/useThemeColor";
import { OnboardingItemType } from "@/lib/types";
import { Image } from "expo-image";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

type Props = {
	data: OnboardingItemType;
};

const onboardingImages: { [key: string]: string } = {
	"1": require("@/assets/images/onboarding/walkthrough-1.png"),
	"2": require("@/assets/images/onboarding/walkthrough-2.png"),
	"3": require("@/assets/images/onboarding/walkthrough-3.png"),
	"4": require("@/assets/images/onboarding/walkthrough-4.png"),
};

export default function OnboardingItem({ data }: Props) {
	const { width, height } = useWindowDimensions();
	const primaryColor = useThemeColor({}, "primary");

	const { title, description, id } = data;

	return (
		<View style={[styles.container, { width, height }]}>
			<Image
				source={onboardingImages[id]}
				// 	source={require(image)}
				style={[styles.image, { width }]}
				contentFit="contain"
			/>

			<View style={{ flex: 0.3 }}>
				<Text style={[styles.title, { color: primaryColor }]}>{title}</Text>
				<Text style={[styles.description, { color: "#ADB3BC" }]}>
					{description}
				</Text>
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
		flex: 0.6,
		maxWidth: 330,
		justifyContent: "center",
	},
	title: {
		fontWeight: "600",
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
