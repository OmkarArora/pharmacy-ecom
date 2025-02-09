import {
	Alert,
	Animated,
	FlatList,
	StyleSheet,
	View,
	ViewabilityConfig,
	ViewToken,
} from "react-native";
import slidesData from "./data";
import OnboardingItem from "./OnboardingItem";
import { useCallback, useEffect, useRef, useState } from "react";
import { OnboardingItemType } from "@/lib/types";
import Paginator from "./Paginator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useStorageState } from "@/hooks/useStorageState";
import { LocalConfig } from "@/lib/values";

export default function OnboardingPage() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const scrollX = useRef(new Animated.Value(0)).current;

	const router = useRouter();
	const [_, setIsOnboarded] = useStorageState(LocalConfig.IS_ONBOARDED);

	const viewableItemsChanged = useRef(
		({ viewableItems }: { viewableItems: ViewToken<OnboardingItemType>[] }) => {
			setCurrentIndex(viewableItems[0].index || 0);
		}
	).current;

	const viewConfig = useRef({
		viewAreaCoveragePercentThreshold: 50,
	} as ViewabilityConfig).current;

	const flatlistRef = useRef<FlatList>(null);

	const onClickNext = useCallback(() => {
		if (currentIndex < slidesData.length - 1) {
			flatlistRef.current?.scrollToIndex({ index: currentIndex + 1 });
		} else {
			setIsOnboarded("true");
			router.push("/sign-in");
		}
	}, [currentIndex, slidesData.length]);

	const onClickSkip = useCallback(() => {
		setIsOnboarded("true");
		router.push("/sign-in");
		// flatlistRef.current?.scrollToIndex({ index: slidesData.length - 1 });
	}, [slidesData.length]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ flex: 3 }}>
				<FlatList
					data={slidesData}
					renderItem={({ item }) => <OnboardingItem data={item} />}
					horizontal
					showsHorizontalScrollIndicator={false}
					pagingEnabled
					bounces={false}
					keyExtractor={(item) => item.id}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						{
							useNativeDriver: false,
						}
					)}
					onViewableItemsChanged={viewableItemsChanged}
					viewabilityConfig={viewConfig}
					// viewAreaCoveragePercentThreshold={50}
					scrollEventThrottle={32}
					ref={flatlistRef}
				/>
			</View>

			<Paginator
				data={slidesData}
				scrollX={scrollX}
				onClickSkip={onClickSkip}
				onClickNext={onClickNext}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
