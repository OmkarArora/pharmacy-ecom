import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { IconSymbol } from "@/components/ui/IconSymbol";
import Spacer from "@/components/ui/spacer";

import { useSession } from "@/lib/SessionProvider";
import { useRouter } from "expo-router";
import {
	ActivityIndicator,
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	Modal,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";

import { useForm, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { LOGIN_SCHEMA } from "@/lib/schema";
import { useState } from "react";
import { Image } from "expo-image";

// Define the form data type
type FormData = {
	username: string;
	password: string;
};

export default function SignUpPage() {
	const {
		signUp,
		status,
		showEmailConfirmOTPInput,
		confirmSignUp,
		cancelSignUpConfirmation,
	} = useSession();
	const router = useRouter();

	const [otp, setOtp] = useState("");

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(LOGIN_SCHEMA),
	});

	const onSubmit = async (data: FormData) => {
		Keyboard.dismiss();

		console.log("submit click");

		try {
			await signUp(data.username, data.password);
		} catch (error) {
			console.log("ERROR", error);
			Alert.alert(`SIGn UP Error ${error}`);
		}
	};

	const submitOtp = async () => {
		Keyboard.dismiss();

		try {
			await confirmSignUp(otp);
			console.log("REDIRECTING TO HOME");
			router.replace("/(tabs)");
		} catch (error) {
			console.log("ERROR", error);
			Alert.alert(`SUBMIT OTP Error ${error}`);
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<Image
				source={require("@/assets/images/icon.png")} // Replace with your logo image
				style={styles.logo}
				contentFit="contain"
			/>
			<Text style={styles.title}>
				Welcome to{"\n"}
				<Text style={styles.titleHighlight}>Medivery!</Text>
			</Text>

			<Controller
				control={control}
				name="username"
				render={({ field: { onChange, onBlur, value } }) => (
					<InputWrapper>
						<IconSymbol name="person" color={"#6B7280"} />
						<TextInput
							placeholder="Email"
							style={styles.input}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							autoComplete="email"
							autoCapitalize="none"
							autoFocus
							placeholderTextColor={"grey"}
						/>
					</InputWrapper>
				)}
			/>

			{errors.username && (
				<Text style={styles.error}>{errors.username.message}</Text>
			)}

			<Controller
				control={control}
				name="password"
				render={({ field: { onChange, onBlur, value } }) => (
					<InputWrapper>
						<IconSymbol name="lock" color={"#6B7280"} />
						<TextInput
							placeholder="Password"
							autoComplete="password"
							style={styles.input}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							secureTextEntry
							placeholderTextColor={"grey"}
						/>
					</InputWrapper>
				)}
			/>
			{errors.password && (
				<Text style={styles.error}>{errors.password.message}</Text>
			)}

			<Spacer width={"100%"} height={16} />

			<PrimaryButton onPress={handleSubmit(onSubmit)} title="Sign Up" />

			<Spacer width={"100%"} height={8} />

			<View style={{ flexDirection: "row" }}>
				<Text>Already regsitered? </Text>
				<SecondaryButton
					onPress={() => {
						Keyboard.dismiss();
						router.replace("/sign-in");
					}}
					title="Log In"
					textStyle={{
						textDecorationLine: "underline",
					}}
				/>
			</View>

			{status === "loading" && <ActivityIndicator style={{ padding: 20 }} />}

			<Modal
				animationType="slide"
				transparent={true}
				visible={showEmailConfirmOTPInput}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={{ fontSize: 18, marginBottom: 16 }}>
							Check your email for an OTP
						</Text>
						<InputWrapper>
							<TextInput
								placeholder="Verification OTP"
								autoComplete="one-time-code"
								style={styles.input}
								onChangeText={(e) => setOtp(e)}
								value={otp}
								placeholderTextColor={"grey"}
							/>
						</InputWrapper>

						<View style={{ flex: 1 }} />

						<PrimaryButton onPress={submitOtp} title="Submit" />
						<SecondaryButton
							onPress={() => {
								Keyboard.dismiss();
								cancelSignUpConfirmation();
							}}
							title="Cancel"
							textStyle={{
								textDecorationLine: "underline",
							}}
						/>
					</View>
				</View>
			</Modal>
		</KeyboardAvoidingView>
	);
}

function InputWrapper({ children }: { children: React.ReactNode }) {
	return <View style={styles.inputWrapper}>{children}</View>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 32,
		alignItems: "center",
		justifyContent: "center",
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		height: 50,
		backgroundColor: "#F6F0E8",
		borderRadius: 8,
		paddingHorizontal: 12,
		marginBottom: 12,
	},
	input: {
		flex: 1,
		color: "#111111",
		fontSize: 15,
	},
	error: {
		color: "red",
		marginBottom: 12,
		textAlign: "left",
		width: "100%",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		width: "80%",
		height: 250,
	},
	logo: {
		width: 60,
		height: 60,
		marginBottom: 20,
		alignSelf: "flex-start",
	},
	title: {
		fontSize: 28,
		textAlign: "left",
		color: "#2F855A",
		fontWeight: "400",
		width: "100%",
		marginBottom: 40,
	},
	titleHighlight: {
		color: "#C79D73",
		fontWeight: "bold",
	},
});
