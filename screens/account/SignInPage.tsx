import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { IconSymbol } from "@/components/ui/IconSymbol";
import Spacer from "@/components/ui/spacer";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSession } from "@/lib/SessionProvider";
import { useRouter } from "expo-router";
import {
	Alert,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the validation schema using Zod
const schema = z.object({
	username: z.string().min(1, "Username/Email is required"),
	password: z.string().min(5, "Password must be at least 5 characters long"),
});

// Define the form data type
type FormData = {
	username: string;
	password: string;
};

export default function SignInPage() {
	const { signIn } = useSession();
	const router = useRouter();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: FormData) => {
		console.log(data);

		if (data.username === "admin" && data.password === "admin") {
			signIn();
			// Navigate after signing in. You may want to tweak this to ensure sign-in is
			// successful before navigating.
			router.replace("/(tabs)");
		} else {
			Alert.alert("Incorrect Email or Password");
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Controller
				control={control}
				name="username"
				render={({ field: { onChange, onBlur, value } }) => (
					<InputWrapper>
						<IconSymbol name="person" color={"#111111"} />
						<TextInput
							placeholder="Username or Email"
							style={styles.input}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							autoComplete="email"
							autoCapitalize="none"
							autoFocus
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
						<IconSymbol name="lock" color={"#111111"} />
						<TextInput
							placeholder="Password"
							autoComplete="password"
							style={styles.input}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							secureTextEntry
						/>
					</InputWrapper>
				)}
			/>
			{errors.password && (
				<Text style={styles.error}>{errors.password.message}</Text>
			)}

			<Spacer width={"100%"} height={16} />

			<PrimaryButton onPress={handleSubmit(onSubmit)} title="Sign In" />

			<Spacer width={"100%"} height={8} />

			<SecondaryButton
				onPress={() => {
					router.replace("/(tabs)");
				}}
				title="Skip"
			/>
		</SafeAreaView>
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
});
