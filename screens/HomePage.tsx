import ProductCard from "@/components/product/ProductCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/lib/SessionProvider";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DATA = [
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
		title: "First Item",
	},
	{
		id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
		title: "Second Item",
	},
	{
		id: "58694a0f-3da1-471f-bd96-145571e29d72n",
		title: "Third Item",
	},
	{
		id: "58694a0f-3da1-471f-bd96-145571e29d72t",
		title: "Third Item",
	},
	{
		id: "58694a0f-3da1-471f-bd96-145571e29d72e",
		title: "Third Item",
	},
	{
		id: "58694a0f-3da1-471f-bd96-145571e29d72w",
		title: "Third Item",
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba4",
		title: "First Item",
	},
	{
		id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f633",
		title: "Second Item",
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2",
		title: "First Item",
	},
	{
		id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f631mmmm",
		title: "Second Item",
	},
	{
		id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f633mmm",
		title: "Second Item",
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2mm",
		title: "First Item",
	},
	{
		id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f631m",
		title: "Second Item",
	},
];

export default function HomePage() {
	const { signOut } = useSession();

	const height = useBottomTabBarHeight();

	console.log("height", height);

	return (
		<SafeAreaView>
			<View style={styles.container}>
				<ThemedText
					onPress={() => {
						// The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
						signOut();
					}}
				>
					Sign Out
				</ThemedText>
				<ThemedText>{height}</ThemedText>

				<ThemedText>Home page</ThemedText>
				<FlatList
					data={DATA}
					renderItem={({ item }) => <ProductCard />}
					keyExtractor={(item) => item.id}
					numColumns={2}
					columnWrapperStyle={{ gap: 20 }}
					style={{
						// backgroundColor: "blue",
						width: "100%",
						paddingBottom: 100,
					}}
					contentContainerStyle={{
						// justifyContent: "center",
						alignItems: "center",
						// backgroundColor: "blue",
						paddingBottom: height + 80,
					}}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",

		// flex: 1,
		// marginRight: "auto",
		// marginLeft: "auto",
		// width: 480,
	},
});
