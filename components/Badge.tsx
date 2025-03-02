import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface BadgeProps {
	count: number;
	size?: number;
	color?: string;
	backgroundColor?: string;
	textStyle?: any;
}

const Badge = ({
	count,
	size = 20,
	color = "white",
	backgroundColor = "red",
	textStyle,
}: BadgeProps) => {
	if (count <= 0) {
		return null;
	}

	return (
		<View
			style={[
				styles.badgeContainer,
				{
					width: size,
					height: size,
					borderRadius: size / 2,
					backgroundColor: backgroundColor,
				},
			]}
		>
			<Text style={[styles.badgeText, { color: color }, textStyle]}>
				{count > 99 ? "99+" : count}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	badgeContainer: {
		position: "absolute",
		top: -5,
		left: -5,
		justifyContent: "center",
		alignItems: "center",
	},
	badgeText: {
		fontSize: 12,
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default Badge;
