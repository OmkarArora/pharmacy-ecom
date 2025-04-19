import Header from "@/components/Header";
import ProductCard from "@/components/product/ProductCard";
import useCategoryProducts from "@/lib/hooks/category/useCategoryProducts";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoryPage({ categoryId }: { categoryId: string }) {
	const { data: products, isFetching } = useCategoryProducts(categoryId);

	return (
		<SafeAreaView style={{ flex: 1, paddingHorizontal: 16 }}>
			<Header />
			<FlashList
				data={products || []}
				numColumns={2}
				renderItem={({ item }) => (
					<View style={styles.itemContainer}>
						<ProductCard data={item} />
					</View>
				)}
				keyExtractor={(item) => item.product_id}
				estimatedItemSize={200}
				ListFooterComponent={() => (isFetching ? <ActivityIndicator /> : null)}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	itemContainer: {
		margin: 8,
	},
});
