import Header from "@/components/Header";
import ProductCard from "@/components/product/ProductCard";
import useCategoryProducts from "@/lib/hooks/category/useCategoryProducts";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoryPage({
	categoryName,
}: {
	categoryName: string;
}) {
	const { data: products, isFetching } = useCategoryProducts(categoryName);

	return (
		<SafeAreaView style={{ flex: 1, paddingHorizontal: 16 }}>
			<Header />
			<FlashList
				data={products || []}
				renderItem={({ item }) => <ProductCard data={item} />}
				keyExtractor={(item) => item.productId}
				estimatedItemSize={200}
				ListFooterComponent={() => (isFetching ? <ActivityIndicator /> : null)}
			/>
		</SafeAreaView>
	);
}
