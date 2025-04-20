import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";

const LoginPage = () => {
	const navigation = useNavigation();

	const handleSignIn = () => {
		// Navigate to HomePage or any dashboard
		navigation.navigate("HomePage" as never);
	};

	const handleSignUp = () => {
		// Navigate to Signup page or show a message
		console.log("Navigate to Signup Screen");
	};

	return (
		<View style={styles.container}>
			<Image
				source={require("../assets/bag-with-plus.png")} // Add your image to assets
				style={styles.logo}
				contentFit="contain"
			/>

			<Text style={styles.title}>Let's Get</Text>
			<Text style={[styles.title, styles.titleBold]}>Started!</Text>

			<TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
				<Text style={styles.signInText}>SIGN IN</Text>
			</TouchableOpacity>

			<Text style={styles.signUpPrompt}>
				DIDN'T HAVE ACCOUNT?{" "}
				<Text style={styles.signUpLink} onPress={handleSignUp}>
					SIGN UP NOW
				</Text>
			</Text>
		</View>
	);
};

export default LoginPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#fff",
	},
	logo: {
		width: 100,
		height: 100,
		marginBottom: 30,
	},
	title: {
		fontSize: 28,
		color: "#6B8E23",
	},
	titleBold: {
		fontWeight: "bold",
	},
	signInButton: {
		marginTop: 40,
		backgroundColor: "#B28B68",
		paddingVertical: 12,
		paddingHorizontal: 60,
		borderRadius: 8,
	},
	signInText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 16,
	},
	signUpPrompt: {
		marginTop: 20,
		fontSize: 14,
		color: "#444",
	},
	signUpLink: {
		color: "#2E8B57",
		fontWeight: "bold",
	},
});
