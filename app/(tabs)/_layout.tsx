import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Platform, Text, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useStorageState } from "@/hooks/useStorageState";
import { LocalConfig } from "@/lib/values";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSession } from "@/lib/SessionProvider";

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const { session, isLoading } = useSession();

	const bgColor = useThemeColor({}, "background");

	const [[isOnboardingStateLoading, isOnboarded], _] = useStorageState(
		LocalConfig.IS_ONBOARDED
	);

	if (isOnboardingStateLoading) return null;

	if (!isOnboarded) return <Redirect href="/onboarding" />;

	if (!session && !isLoading) return <Redirect href={"/sign-in"} />;

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].primary,

				headerShown: false,
				tabBarButton: HapticTab,
				// tabBarBackground: TabBarBackground,

				tabBarStyle: {
					backgroundColor: bgColor,
					...Platform.select({
						ios: {
							// Use a transparent background on iOS to show the blur effect
							position: "absolute",
						},
						default: {},
					}),
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="house.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "Search",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="magnifyingglass" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="cart"
				options={{
					title: "Cart",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="cart.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="account"
				options={{
					title: "Account",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="person.fill" color={color} />
					),
				}}
			/>
			{/* <Tabs.Screen
				name="explore"
				options={{
					title: "Explore",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="paperplane.fill" color={color} />
					),
				}}
			/> */}
		</Tabs>
	);
}
