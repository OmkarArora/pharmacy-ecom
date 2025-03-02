import ScreenWrapper from "@/components/ui/ScreenWrapper";
import ProductPage from "@/screens/ProductPage";
import { useLocalSearchParams } from "expo-router";

export default function Page() {
	const { productId } = useLocalSearchParams();

	return (
		<ScreenWrapper>
			<ProductPage productId={productId as string} />
		</ScreenWrapper>
	);
}
