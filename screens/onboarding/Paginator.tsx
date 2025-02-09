import { SecondaryButton } from "@/components/ui/buttons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { OnboardingItemType } from "@/lib/types";
import {
	Animated,
	Button,
	StyleSheet,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native";

type Props = {
	data: OnboardingItemType[];
	scrollX: Animated.Value;
	onClickSkip: () => void;
	onClickNext: () => void;
};

export default function Paginator({
	data,
	scrollX,
	onClickSkip,
	onClickNext,
}: Props) {
	const { width } = useWindowDimensions();
	const primaryColor = useThemeColor({}, "primary");

	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				height: 64,
				alignItems: "center",
				width: "100%",
				paddingHorizontal: 40,
			}}
		>
			<SecondaryButton
				onPress={onClickSkip}
				title="Skip"
				textStyle={{ fontWeight: "400", fontSize: 16 }}
			/>

			<View style={{ flexDirection: "row" }}>
				{data.map((_, index) => {
					const inputRange = [
						(index - 1) * width,
						index * width,
						(index + 1) * width,
					];

					const dotWidth = scrollX.interpolate({
						inputRange,
						outputRange: [10, 30, 10],
						extrapolate: "clamp",
					});

					const opacity = scrollX.interpolate({
						inputRange,
						outputRange: [0.3, 1, 0.3],
						extrapolate: "clamp",
					});

					return (
						<Animated.View
							key={index}
							style={[
								styles.dot,
								{ backgroundColor: primaryColor },
								{ width: dotWidth, opacity },
							]}
						/>
					);
				})}
			</View>

			<TouchableOpacity onPress={onClickNext}>
				<Text style={{ color: primaryColor, fontWeight: "600", fontSize: 16 }}>
					Next
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	dot: {
		height: 10,
		borderRadius: 5,
		backgroundColor: "red",
		marginHorizontal: 8,
	},
});
