import ProductPage from "@/screens/ProductPage";
import { useLocalSearchParams } from "expo-router";

export default function Page() {
	const { productId } = useLocalSearchParams();

	return <ProductPage productId={productId as string} />;
}
