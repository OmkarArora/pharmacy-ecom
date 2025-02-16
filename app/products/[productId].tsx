import ProductPage from "@/screens/ProductPage";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Page() {
	const { productId } = useLocalSearchParams();
	const router = useRouter();

	return (
		<ProductPage productId={productId as string} onBack={() => router.back()} />
	);
}
