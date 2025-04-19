import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { IconSymbol } from "@/components/ui/IconSymbol";
import Spacer from "@/components/ui/spacer";

import { useSession } from "@/lib/SessionProvider";
import { useRouter } from "expo-router";
import {
	ActivityIndicator,
	Alert,
	Button,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LOGIN_SCHEMA } from "@/lib/schema";
import useToastStore from "@/lib/store/toast-store";
import { Image } from "expo-image";

// Define the form data type
type FormData = {
	username: string;
	password: string;
};

export default function SignInPage() {
	const { signIn, status, debugForceSignIn } = useSession();
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
			Alert.alert(`SIGn In Error ${error}`);
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
				Welcome{"\n"}
				<Text style={styles.titleHighlight}>Back!</Text>
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

			<PrimaryButton onPress={handleSubmit(onSubmit)} title="Log In" />

			<Spacer width={"100%"} height={8} />

			<View style={{ flexDirection: "row" }}>
				<Text>New here? </Text>
				<SecondaryButton
					onPress={() => {
						Keyboard.dismiss();
						router.push("/sign-up");
					}}
					title="Sign Up"
					textStyle={{
						textDecorationLine: "underline",
					}}
				/>
				{/* <Text> or </Text>
				<SecondaryButton
					onPress={() => {
						Keyboard.dismiss();
						router.replace("/(tabs)");
					}}
					title="Skip"
				/> */}
			</View>

			{/* <Button
				title="Bypass Auth"
				onPress={() => {
					debugForceSignIn();
					router.replace("/(tabs)");
				}}
			/> */}

			{status === "loading" && <ActivityIndicator style={{ padding: 20 }} />}
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
