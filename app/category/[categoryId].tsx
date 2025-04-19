import ScreenWrapper from "@/components/ui/ScreenWrapper";
import CategoryPage from "@/screens/CategoryPage";
import { useLocalSearchParams } from "expo-router";

export default function Page() {
	const { categoryId } = useLocalSearchParams();
	return (
		<ScreenWrapper>
			<CategoryPage categoryId={categoryId as string} />
		</ScreenWrapper>
	);
}
