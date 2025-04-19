import Header from "@/components/Header";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ManagePayments() {
	const [activeTab, setActiveTab] = useState("PharmacyPayments");

	return (
		<SafeAreaView style={{ flex: 1, padding: 16 }}>
			<Header />
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
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// flexDirection: "row",
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
	emptyText: {
		fontSize: 18,
		color: "#555",
		textAlign: "center",
	},
	emptyState: {
		alignItems: "center",
	},
	contentArea: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderColor: "#ccc",
	},
});
