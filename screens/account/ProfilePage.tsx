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

const userName = "John Doe";

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
					<Text style={[styles.userName, { color: primaryColor }]}>
						{userName}
					</Text>
					{/* <Text
						style={styles.editDetails}
						onPress={() => {
							// navigation.navigate('EditContactDetails')
						}}
					>
						edit contact details
					</Text> */}
				</View>

				<View style={[styles.rateAppSection]}>
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
					<TouchableOpacity
						style={styles.sectionItem}
						onPress={() => {
							// navigation.navigate('ManagePayment')
							router.push("/manage-payments");
						}}
					>
						<Text style={styles.sectionText}>Manage Payment</Text>
					</TouchableOpacity>
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
					<TouchableOpacity
						style={styles.sectionItem}
						onPress={() => {
							router.push("/random");
						}}
					>
						<Text style={styles.sectionText}>Random</Text>
					</TouchableOpacity>
					
				</View>

				<View style={styles.footer}>
					<Text style={styles.versionText}>Version 1.3.9</Text>
					<TouchableOpacity style={styles.logoutButton} onPress={signOut}>
						<Text style={styles.logoutText}>Logout</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={clearData}
						style={{ backgroundColor: "red", padding: 10, marginTop: 10 }}
					>
						<Text
							style={{
								color: "white",
								fontSize: 20,
								textTransform: "uppercase",
								textAlign: "center",
							}}
						>
							Clear App Settings
						</Text>
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
	},
	header: {
		marginBottom: 20,
	},
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 10,
	},
	userName: {
		fontSize: 35,
		fontWeight: "bold",
		color: "#333",
	},
	editDetails: {
		fontSize: 14,
		color: "#1E90FF",
		marginTop: 5,
		textDecorationLine: "underline",
	},
	rateAppSection: {
		marginBottom: 20,
		alignItems: "center",
	},
	rateAppButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#E0F7FA",
		padding: 15,
		borderRadius: 10,
		paddingVertical: 20,
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
		marginBottom: 20,
	},
	sectionItem: {
		borderBottomWidth: 1,
		borderBottomColor: "#ddd",
		paddingVertical: 15,
	},
	sectionText: {
		fontSize: 16,
		color: "#333",
	},
	footer: {
		alignItems: "center",
	},
	versionText: {
		fontSize: 14,
		color: "#999",
		marginBottom: 10,
	},
	logoutButton: {
		backgroundColor: "#FF5252",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	logoutText: {
		fontSize: 16,
		color: "#fff",
		fontWeight: "600",
	},
	screenContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
});
