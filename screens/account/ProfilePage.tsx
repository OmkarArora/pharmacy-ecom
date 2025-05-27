import { clearStoredKeys } from "@/hooks/useStorageState";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSession } from "@/lib/SessionProvider";
import { useAddressStore } from "@/lib/store/address-store";
import useCartStore from "@/lib/store/cart-store";
import { LocalConfig } from "@/lib/values";
import { useRouter } from "expo-router";
import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	ScrollView,
	useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Placeholder screens for navigation
const MyOrdersScreen = () => (
	<View style={styles.screenContainer}>
		<Text>My Orders Screen</Text>
	</View>
);

const ManagePaymentScreen = () => (
	<View style={styles.screenContainer}>
		<Text>Manage Payment Screen</Text>
	</View>
);

const AddressBookScreen = () => (
	<View style={styles.screenContainer}>
		<Text>Address Book Screen</Text>
	</View>
);

const AboutCompanyScreen = () => (
	<View style={styles.screenContainer}>
		<Text>About the Company Screen</Text>
	</View>
);

// User data
const user = {
	name: "John Doe",
	email: "john.doe@example.com",
	mobile: "+91 9876543210",
	photo:
		require("@/assets/images/profile_photo.png"), // Placeholder image path
};

export default function ProfilePage() {
	const primaryColor = useThemeColor({}, "primary");
	const router = useRouter();
	const { signOut } = useSession();

	function clearData() {
		clearStoredKeys([LocalConfig.IS_ONBOARDED]);
		useCartStore.getState().resetData();
		useAddressStore.getState().resetData();
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.header}>
				<Image source={user.photo} style={styles.profileImage} />
					<Text style={[styles.userName, { color: primaryColor }]}>
						{user.name}
					</Text>
					<Text style={styles.userInfo}>{user.mobile}</Text>
					<Text style={styles.userInfo}>{user.email}</Text>

					{/* <Text
						style={styles.editDetails}
						onPress={() => {
							// navigation.navigate('EditContactDetails')
						}}
					>
						edit contact details
					</Text> */}
				</View>

				<View style={styles.rateAppSection}>
					<TouchableOpacity
						style={[styles.rateAppButton, { backgroundColor: primaryColor }]}
					>
						<Text style={styles.rateAppText}>Rate the app</Text>
						<View style={styles.stars}>
							{[...Array(5)].map((_, index) => (
								<Text key={index} style={styles.star}>
									⭐
								</Text>
							))}
						</View>
					</TouchableOpacity>
				</View>

				<View style={styles.section}>
					<TouchableOpacity
						style={styles.sectionItem}
						onPress={() => {
							// navigation.navigate('MyOrders')
							router.push("/my-orders");
						}}
					>
						<Text style={styles.sectionText}>My Orders</Text>
					</TouchableOpacity>

					{/* <TouchableOpacity
						style={styles.sectionItem}
						onPress={() => {
							// navigation.navigate('ManagePayment')
							router.push("/manage-payments");
						}}
					>
						<Text style={styles.sectionText}>Manage Payment</Text>
					</TouchableOpacity> */}

					<TouchableOpacity
						style={styles.sectionItem}
						onPress={() => {
							router.push("/address-book");
						}}
					>
						<Text style={styles.sectionText}>Address Book</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.sectionItem}
						onPress={() => {
							// navigation.navigate('AboutCompany')
						}}
					>
						<Text style={styles.sectionText}>About the company</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.footer}>
					<Text style={styles.versionText}>Version 1.3.9</Text>
					<TouchableOpacity style={styles.logoutButton} onPress={signOut}>
						<Text style={styles.logoutText}>Logout</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={clearData}
						style={styles.clearDataButton}
					>
						<Text style={styles.clearDataText}>Clear App Settings</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		paddingTop: 40,
		paddingHorizontal: 20,
	},
	header: {
		alignItems: "center",
		marginBottom: 30,
	},
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 10,
		borderWidth: 2,
		borderColor: "#ccc",
	},
	userName: {
		fontSize: 24,
		fontWeight: "bold",
	},
	userInfo: {
		fontSize: 14,
		color: "#666",
	},
	editDetails: {
		fontSize: 14,
		color: "#1E90FF",
		marginTop: 5,
		textDecorationLine: "underline",
	},
	rateAppSection: {
		marginBottom: 30,
		alignItems: "center",
	},
	rateAppButton: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		borderRadius: 12,
		width: "100%",
		justifyContent: "space-between",
	},
	rateAppText: {
		fontSize: 16,
		fontWeight: "600",
		color: "white",
	},
	stars: {
		flexDirection: "row",
	},
	star: {
		fontSize: 18,
		marginHorizontal: 2,
	},
	section: {
		backgroundColor: "#fff",
		borderRadius: 10,
		paddingHorizontal: 15,
		paddingVertical: 10,
		marginBottom: 30,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowRadius: 10,
		elevation: 2,
	},
	sectionItem: {
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
		paddingVertical: 15,
	},
	sectionText: {
		fontSize: 16,
		color: "#333",
	},
	footer: {
		alignItems: "center",
		paddingBottom: 30,
	},
	versionText: {
		fontSize: 14,
		color: "#999",
		marginBottom: 15,
	},
	logoutButton: {
		backgroundColor: "#FF5252",
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 25,
		marginBottom: 10,
	},
	logoutText: {
		fontSize: 16,
		color: "#fff",
		fontWeight: "600",
	},
	clearDataButton: {
		backgroundColor: "red",
		paddingVertical: 10,
		paddingHorizontal: 25,
		borderRadius: 25,
	},
	clearDataText: {
		color: "white",
		fontSize: 14,
		fontWeight: "600",
		textTransform: "uppercase",
		textAlign: "center",
	},
	screenContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
});
