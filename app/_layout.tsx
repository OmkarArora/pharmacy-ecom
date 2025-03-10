import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SessionProvider } from "@/lib/SessionProvider";
import OnboardingPage from "@/screens/onboarding/OnboardingPage";
import { useStorageState } from "@/hooks/useStorageState";
import { LocalConfig } from "@/lib/values";
import Toast from "@/components/ui/toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { View } from "react-native";

import "../lib/amplifyConfig";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>
				<ThemeProvider
					value={colorScheme === "dark" ? DefaultTheme : DefaultTheme}
				>
					{/* DarkTheme */}
					{/* <Stack>
					<Stack.Screen name="login" options={{ headerShown: false }} />
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen name="+not-found" />
				</Stack> */}

					<Stack>
						{/* <Stack.Screen name='login'/> */}
						<Stack.Screen
							name="onboarding"
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen name="sign-in" options={{ headerShown: false }} />
						<Stack.Screen name="sign-up" options={{ headerShown: false }} />

						<Stack.Screen
							name="(tabs)"
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="products/[productId]"
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="category/[categoryName]"
							options={{ headerShown: false }}
						/>
						<Stack.Screen name="my-orders" options={{ headerShown: false }} />
						<Stack.Screen
							name="manage-payments"
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="address-book"
							options={{ headerShown: false }}
						/>

						<Stack.Screen name="+not-found" />
					</Stack>
					<Toast />
					<StatusBar style="dark" />
				</ThemeProvider>
			</SessionProvider>
		</QueryClientProvider>
	);
}
