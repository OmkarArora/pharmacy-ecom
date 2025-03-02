import { useThemeColor } from "@/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "react-native";

export default function RatingPill({ rating }: { rating: number }) {
	const primaryColor = useThemeColor({}, "primary");

	return (
		<View>
			<Ionicons name="star" size={24} color={primaryColor} />
			<Text>{rating}</Text>
		</View>
	);
}
