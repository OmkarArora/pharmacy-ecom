import { DimensionValue, View } from "react-native";

export default function Spacer({
	width,
	height,
}: {
	width?: DimensionValue;
	height?: DimensionValue;
}) {
	return <View style={{ width, height, flexShrink: 0 }} />;
}
