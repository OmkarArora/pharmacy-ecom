import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text } from "react-native";

export default function Page() {
	const { productId } = useLocalSearchParams();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Text>Product ID - {productId}</Text>
		</SafeAreaView>
	);
}
