import { useThemeColor } from "@/hooks/useThemeColor";
import {
	TouchableOpacity,
	StyleProp,
	ViewStyle,
	StyleSheet,
	Text,
	TextStyle,
} from "react-native";

type ButtonProps = {
	title: string;
	onPress: () => void;
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
};

export function PrimaryButton({ onPress, title, style }: ButtonProps) {
	const primaryColor = useThemeColor({}, "primary");

	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.primaryButton, { backgroundColor: primaryColor }, style]}
		>
			<Text style={styles.primaryButtonText}>{title}</Text>
		</TouchableOpacity>
	);
}

export function SecondaryButton({
	onPress,
	title,
	style,
	textStyle = {},
}: ButtonProps) {
	const secondaryColor = useThemeColor({}, "secondary");

	return (
		<TouchableOpacity onPress={onPress} style={[style]}>
			<Text
				style={[
					styles.secondaryButtonText,
					textStyle,
					{ color: secondaryColor },
				]}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	primaryButton: {
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "stretch",
		paddingVertical: 12,
		paddingHorizontal: 12,
	},
	primaryButtonText: {
		color: "#ffffff",
		fontSize: 19,
	},
	secondaryButtonText: {
		fontSize: 15,
	},
});
