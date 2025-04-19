import { useThemeColor } from "@/hooks/useThemeColor";
import { View } from "react-native";

type Props = {
	children: React.ReactNode;
};

export default function ScreenWrapper({ children }: Props) {
	const bgColor = useThemeColor({}, "background");

	return (
		<View style={{ flex: 1, backgroundColor: bgColor, paddingHorizontal: 15 }}>
			{children}
		</View>
	);
}
