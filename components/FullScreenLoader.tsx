import React from "react";
import {
	View,
	StyleSheet,
	ActivityIndicator,
	Dimensions,
	Text,
} from "react-native";

const { width, height } = Dimensions.get("window");

const FullScreenLoader = ({
	visible,
	text,
}: {
	visible: boolean;
	text: string;
}) => {
	if (!visible) {
		return null;
	}

	return (
		<View style={styles.overlay}>
			<View style={styles.container}>
				<ActivityIndicator size="large" color="#0000ff" />
				{!!text && <Text style={styles.text}>{text}</Text>}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		width: width,
		height: height,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1000,
	},
	container: {
		backgroundColor: "white",
		borderRadius: 8,
		padding: 20,
		alignItems: "center",
	},
	text: {
		marginTop: 10,
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default FullScreenLoader;
