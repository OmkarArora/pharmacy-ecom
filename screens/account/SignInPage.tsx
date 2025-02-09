import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { IconSymbol } from "@/components/ui/IconSymbol";
import Spacer from "@/components/ui/spacer";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSession } from "@/lib/SessionProvider";
import { useRouter } from "expo-router";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInPage() {
	const { signIn } = useSession();
	const router = useRouter();
	const primaryColor = useThemeColor({}, "primary");
	return (
		<SafeAreaView style={styles.container}>
			<InputWrapper>
				<IconSymbol name="person" color={"#111111"} />
				<TextInput
					placeholder="Email or Username"
					style={styles.input}
					autoComplete="email"
					autoFocus
				/>
			</InputWrapper>

			<InputWrapper>
				<IconSymbol name="lock" color={"#111111"} />
				<TextInput
					placeholder="Password"
					autoComplete="password"
					style={styles.input}
					secureTextEntry
				/>
			</InputWrapper>

			<Spacer width={"100%"} height={16} />

			<PrimaryButton
				onPress={() => {
					signIn();
					// Navigate after signing in. You may want to tweak this to ensure sign-in is
					// successful before navigating.
					router.replace("/(tabs)");
				}}
				title="Sign In"
			/>

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
});
