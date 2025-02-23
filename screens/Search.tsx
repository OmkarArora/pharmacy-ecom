import Header from "@/components/Header";
import useCategories, {
	CategoryType,
} from "@/lib/hooks/category/useCategories";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
	const { data, isFetching } = useCategories();

	return (
		<SafeAreaView style={{ flex: 1, paddingHorizontal: 16 }}>
			<Header />
			<ScrollView style={{ flex: 1 }}>
				{data?.map((category) => (
					<CategoryItem key={category.name} category={category} />
				))}
			</ScrollView>

			{isFetching && <ActivityIndicator />}
		</SafeAreaView>
	);
}

function CategoryItem({ category }: { category: CategoryType }) {
	return (
		<Link href={`/category/${category.name}`}>
			<View style={styles.categoryItem}>
				<Text style={styles.categoryName}>{category.name}</Text>

				<MaterialIcons name="chevron-right" size={24} color={"#ADB3BC"} />
			</View>
		</Link>
	);
}

const styles = StyleSheet.create({
	categoryItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "#ADB3BC",
		height: 48,
		width: "100%",
	},
	categoryName: {
		fontSize: 20,
		color: "black",
	},
});
