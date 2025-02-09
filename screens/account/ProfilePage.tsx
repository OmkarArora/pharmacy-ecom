import { clearStoredKeys } from "@/hooks/useStorageState";
import { LocalConfig } from "@/lib/values";
import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	ScrollView,
} from "react-native";

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
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.header}>
				<Image
					source={{ uri: "https://via.placeholder.com/100" }} // Replace with a user profile image URL
					style={styles.profileImage}
				/>
				<Text style={styles.userName}>{userName}</Text>
				<Text
					style={styles.editDetails}
					onPress={() => {
						// navigation.navigate('EditContactDetails')
					}}
				>
					edit contact details
				</Text>
			</View>

			<View style={styles.rateAppSection}>
				<TouchableOpacity style={styles.rateAppButton}>
					<Text style={styles.rateAppText}>Rate an app</Text>
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
					}}
				>
					<Text style={styles.sectionText}>My Orders</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.sectionItem}
					onPress={() => {
						// navigation.navigate('ManagePayment')
					}}
				>
					<Text style={styles.sectionText}>Manage Payment</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.sectionItem}
					onPress={() => {
						// navigation.navigate('AddressBook')
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
				<TouchableOpacity style={styles.logoutButton}>
					<Text style={styles.logoutText}>Logout</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => clearStoredKeys([LocalConfig.IS_ONBOARDED])}
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
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 20,
		backgroundColor: "#fff",
	},
	header: {
		alignItems: "center",
		marginBottom: 20,
	},
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 10,
	},
	userName: {
		fontSize: 20,
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
		width: "100%",
		justifyContent: "space-between",
	},
	rateAppText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#00796B",
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
