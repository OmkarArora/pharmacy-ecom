import ProductDetails from "@/screens/ProductDetails";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Page() {
	const { productId } = useLocalSearchParams();
	const router = useRouter();

	return (
		<ProductDetails
			productId={productId as string}
			onBack={() => router.back()}
		/>
	);
}
