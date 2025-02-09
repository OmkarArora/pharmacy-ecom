import { clearStoredKeys } from "@/hooks/useStorageState";
import { LocalConfig } from "@/lib/values";
import { Redirect, useRouter } from "expo-router";
import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	TextInput,
	Button,
	ScrollView,
	Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyAccount = () => {
	const [activeSection, setActiveSection] = useState("ManageProfile");

	const router = useRouter();

	const renderContent = () => {
		switch (activeSection) {
			case "ManageProfile":
				return (
					<View style={styles.formContainer}>
						<Text style={styles.heading}>Manage Profile</Text>
						<TextInput style={styles.input} placeholder="First Name" />
						<TextInput style={styles.input} placeholder="Last Name" />
						<TextInput style={styles.input} placeholder="Gender" />
						<TextInput style={styles.input} placeholder="Date of Birth" />
						<TextInput style={styles.input} placeholder="Email ID (Optional)" />
						<Button title="Save" onPress={() => alert("Profile Saved!")} />
					</View>
				);
			case "MyPayments":
				return <MyPayments />;
			case "AddressBook":
				return (
					<View style={styles.addressContainer}>
						<Text style={styles.heading}>Address Book</Text>
						<View style={styles.addressItem}>
							<Text style={styles.label}>123 Main St, Cityville</Text>
							<View style={styles.buttonRow}>
								<Button title="Edit" onPress={() => alert("Edit Address")} />
								<Button
									title="Delete"
									onPress={() => alert("Delete Address")}
								/>
							</View>
						</View>
						<Button
							title="Add New Address"
							onPress={() => alert("Add Address")}
						/>
					</View>
				);
			case "NeedHelp":
				return (
					<View style={styles.blankContainer}>
						<Text style={styles.heading}>Need Help</Text>
					</View>
				);

			default:
				return null;
		}
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
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
			<View style={styles.container}>
				<View style={styles.sidebar}>
					<TouchableOpacity
						onPress={() => setActiveSection("ManageProfile")}
						style={styles.sidebarButton}
					>
						<Text style={styles.sidebarText}>Manage Profile</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setActiveSection("MyPayments")}
						style={styles.sidebarButton}
					>
						<Text style={styles.sidebarText}>My Payments</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setActiveSection("AddressBook")}
						style={styles.sidebarButton}
					>
						<Text style={styles.sidebarText}>Address Book</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setActiveSection("NeedHelp")}
						style={styles.sidebarButton}
					>
						<Text style={styles.sidebarText}>Need Help</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => router.push("/my-orders")}
						style={styles.sidebarButton}
					>
						<Text style={styles.sidebarText}>My Orders</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => alert("Logged Out")}
						style={styles.sidebarButton}
					>
						<Text style={styles.sidebarText}>Logout</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.content}>{renderContent()}</View>
			</View>
		</SafeAreaView>
	);
};

const MyPayments = () => {
	const [activeTab, setActiveTab] = useState("PharmacyPayments");

	return (
		<View style={styles.container}>
			{/* Header Tabs */}
			<View style={styles.header}>
				<TouchableOpacity
					style={[
						styles.tab,
						activeTab === "PharmacyPayments" && styles.activeTab,
					]}
					onPress={() => setActiveTab("PharmacyPayments")}
				>
					<Text
						style={[
							styles.tabText,
							activeTab === "PharmacyPayments" && styles.activeTabText,
						]}
					>
						PHARMACY PAYMENTS
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.tab,
						activeTab === "ManagePayments" && styles.activeTab,
					]}
					onPress={() => setActiveTab("ManagePayments")}
				>
					<Text
						style={[
							styles.tabText,
							activeTab === "ManagePayments" && styles.activeTabText,
						]}
					>
						MANAGE PAYMENTS
					</Text>
				</TouchableOpacity>
			</View>

			{/* Tab Content */}
			<View style={styles.contentArea}>
				{activeTab === "PharmacyPayments" ? (
					<View style={styles.emptyState}>
						{/* <Image
              source={require("./assets/no_payment_history.png")}
              style={styles.icon}
            /> */}
						<Text style={styles.emptyText}>You have no payment history!</Text>
					</View>
				) : (
					<View style={styles.emptyState}>
						{/* <Image
							source={require("./assets/no_saved_cards.png")}
							style={styles.icon}
						/> */}
						<Text style={styles.emptyText}>You have no saved cards!</Text>
					</View>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
	},
	sidebar: {
		width: "25%",
		backgroundColor: "#f0f0f0",
		paddingVertical: 20,
	},
	sidebarButton: {
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#ddd",
	},
	sidebarText: {
		fontSize: 16,
		color: "#333",
	},
	content: {
		flex: 1,
		padding: 20,
	},
	formContainer: {
		padding: 20,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
		marginBottom: 15,
	},
	heading: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
	},
	addressContainer: {
		padding: 20,
	},
	addressItem: {
		marginBottom: 15,
		padding: 15,
		backgroundColor: "#fff",
		borderRadius: 5,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
	},
	label: {
		fontSize: 16,
		marginBottom: 10,
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	blankContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderColor: "#ccc",
	},
	tab: {
		flex: 1,
		padding: 15,
		alignItems: "center",
	},
	activeTab: {
		borderBottomWidth: 3,
		borderColor: "#007BFF",
	},
	tabText: {
		fontSize: 16,
		color: "#555",
		fontWeight: "bold",
	},
	activeTabText: {
		color: "#007BFF",
	},
	contentArea: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	emptyState: {
		alignItems: "center",
	},
	icon: {
		width: 60,
		height: 60,
		marginBottom: 10,
	},
	emptyText: {
		fontSize: 18,
		color: "#555",
		textAlign: "center",
	},
});

export default MyAccount;
