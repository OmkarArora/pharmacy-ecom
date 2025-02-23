import CategoryPage from "@/screens/CategoryPage";
import { useLocalSearchParams } from "expo-router";

export default function Page() {
	const { categoryName } = useLocalSearchParams();
	return <CategoryPage categoryName={categoryName as string} />;
}
