// Toast.tsx
import useToastStore from "@/lib/store/toast-store";
import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Animated,
	Platform,
	Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const Toast = () => {
	const { message, visible, hide } = useToastStore();
	console.log(hide, message);
	const fadeAnim = React.useRef(new Animated.Value(0)).current;
	const insets = useSafeAreaInsets();
	const toastHeight = Platform.OS === "web" ? 40 : 60;
	const bottomOffset = Platform.OS === "web" ? 20 : insets.bottom + 20;

	React.useEffect(() => {
		if (visible) {
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}).start(() => {
				setTimeout(() => {
					Animated.timing(fadeAnim, {
						toValue: 0,
						duration: 300,
						useNativeDriver: true,
					}).start(() => {
						hide();
					});
				}, 2000);
			});
		} else {
			fadeAnim.setValue(0); // Reset opacity when hidden
		}
	}, [visible, fadeAnim, hide]);

	return visible ? (
		<Animated.View
			style={[
				styles.container,
				{
					opacity: fadeAnim,
					bottom: bottomOffset,
					height: toastHeight,
				},
			]}
		>
			<Text style={styles.text}>{message}</Text>
		</Animated.View>
	) : null;
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		left: 20,
		right: 20,
		backgroundColor: "rgba(0,0,0,0.7)",
		borderRadius: 5,
		padding: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		color: "white",
		fontSize: 16,
	},
});

export default Toast;
