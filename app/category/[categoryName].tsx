import ScreenWrapper from "@/components/ui/ScreenWrapper";
import CategoryPage from "@/screens/CategoryPage";
import { useLocalSearchParams } from "expo-router";

export default function Page() {
	const { categoryName } = useLocalSearchParams();
	return (
		<ScreenWrapper>
			<CategoryPage categoryName={categoryName as string} />
		</ScreenWrapper>
	);
}
