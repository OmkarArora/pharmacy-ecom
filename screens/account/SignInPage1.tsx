import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { IconSymbol } from "@/components/ui/IconSymbol";
import Spacer from "@/components/ui/spacer";
import { useSession } from "@/lib/SessionProvider";
import { useRouter } from "expo-router";
import {
	ActivityIndicator,
	Alert,
	Image,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LOGIN_SCHEMA } from "@/lib/schema";
import useToastStore from "@/lib/store/toast-store";

type FormData = {
	username: string;
	password: string;
};

export default function SignInPage() {
	const { signIn, status } = useSession();
	const router = useRouter();
	const showToast = useToastStore((state) => state.show);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(LOGIN_SCHEMA),
	});

	const onSubmit = async (data: FormData) => {
		Keyboard.dismiss();
		try {
			await signIn(data.username, data.password);
			router.replace("/(tabs)");
		} catch (error) {
			showToast("Something went wrong!");
			console.log("ERROR", error);
			Alert.alert(`Sign In Error`, `${error}`);
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
				resizeMode="contain"
			/>

			<Text style={styles.title}>
				Welcome <Text style={styles.titleHighlight}>Back!</Text>
			</Text>

			<Spacer height={30} />

			{/* Email Input */}
			<Controller
				control={control}
				name="username"
				render={({ field: { onChange, onBlur, value } }) => (
					<View style={styles.inputWrapper}>
						<IconSymbol name="mail" color="#6B7280" />
						<TextInput
							placeholder="Email Adress"
							style={styles.input}
							placeholderTextColor="#6B7280"
							autoCapitalize="none"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					</View>
				)}
			/>
			{errors.username && (
				<Text style={styles.error}>{errors.username.message}</Text>
			)}

			{/* Password Input */}
			<Controller
				control={control}
				name="password"
				render={({ field: { onChange, onBlur, value } }) => (
					<View style={styles.inputWrapper}>
						<IconSymbol name="lock" color="#6B7280" />
						<TextInput
							placeholder="Password"
							style={styles.input}
							placeholderTextColor="#6B7280"
							secureTextEntry
							autoCapitalize="none"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					</View>
				)}
			/>
			{errors.password && (
				<Text style={styles.error}>{errors.password.message}</Text>
			)}

			<Spacer height={20} />

			<PrimaryButton onPress={handleSubmit(onSubmit)} title="LOG IN" />

			<TouchableOpacity style={styles.forgotPassword}>
				<Text style={styles.forgotPasswordText}>Forgot Password?</Text>
			</TouchableOpacity>

			<Spacer height={30} />

			<View style={styles.bottomText}>
				<Text style={styles.lightText}>Don’t have an account? </Text>
				<TouchableOpacity onPress={() => router.push("/sign-up")}>
					<Text style={styles.signUpText}>Sign up</Text>
				</TouchableOpacity>
			</View>

			{status === "loading" && <ActivityIndicator style={{ padding: 20 }} />}
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
		justifyContent: "center",
	},
	logo: {
		width: 60,
		height: 60,
		alignSelf: "center",
		marginBottom: 20,
	},
	title: {
		fontSize: 28,
		textAlign: "center",
		color: "#2F855A",
		fontWeight: "400",
	},
	titleHighlight: {
		color: "#C79D73",
		fontWeight: "bold",
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#F6F0E8",
		borderRadius: 8,
		paddingHorizontal: 12,
		marginBottom: 12,
		height: 48,
	},
	input: {
		flex: 1,
		fontSize: 16,
		color: "#111",
	},
	error: {
		color: "red",
		fontSize: 12,
		marginBottom: 8,
		marginLeft: 5,
	},
	forgotPassword: {
		alignItems: "flex-end",
		marginTop: 8,
	},
	forgotPasswordText: {
		color: "#2F855A",
		textDecorationLine: "underline",
	},
	bottomText: {
		flexDirection: "row",
		justifyContent: "center",
	},
	lightText: {
		fontStyle: "italic",
		color: "#444",
	},
	signUpText: {
		fontWeight: "bold",
		color: "#2F855A",
		marginLeft: 4,
	},
});
