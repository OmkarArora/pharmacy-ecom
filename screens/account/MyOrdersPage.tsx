import Header from "@/components/Header";
import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyOrdersPage: React.FC = () => {
	const [selectedTab, setSelectedTab] = useState<
		"all" | "delivered" | "cancelled"
	>("all");

	const handleTabChange = (tab: "all" | "delivered" | "cancelled") => {
		setSelectedTab(tab);
	};

	const renderNoOrdersMessage = () => (
		<View style={styles.noOrdersContainer}>
			<Text style={styles.noOrdersText}>Uh oh! :)</Text>
			<Text style={styles.noOrdersSubText}>No Orders Found!</Text>
			<TouchableOpacity style={styles.orderNowButton}>
				<Text style={styles.orderNowButtonText}>ORDER NOW</Text>
			</TouchableOpacity>
		</View>
	);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={styles.container}>
				{/* Breadcrumb */}
				{/* <Text style={styles.breadcrumb}>Home {">"} My Orders</Text> */}
				<Header />

				{/* Header */}
				<Text style={styles.header}>MY ORDERS</Text>

				{/* Tabs */}
				<View style={styles.tabsContainer}>
					<TouchableOpacity
						style={[styles.tab, selectedTab === "all" && styles.activeTab]}
						onPress={() => handleTabChange("all")}
					>
						<Text
							style={[
								styles.tabText,
								selectedTab === "all" && styles.activeTabText,
							]}
						>
							All Orders
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.tab,
							selectedTab === "delivered" && styles.activeTab,
						]}
						onPress={() => handleTabChange("delivered")}
					>
						<Text
							style={[
								styles.tabText,
								selectedTab === "delivered" && styles.activeTabText,
							]}
						>
							Delivered
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.tab,
							selectedTab === "cancelled" && styles.activeTab,
						]}
						onPress={() => handleTabChange("cancelled")}
					>
						<Text
							style={[
								styles.tabText,
								selectedTab === "cancelled" && styles.activeTabText,
							]}
						>
							Cancelled
						</Text>
					</TouchableOpacity>
				</View>

				{/* No Orders Message */}
				<View style={styles.ordersContent}>{renderNoOrdersMessage()}</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	breadcrumb: {
		fontSize: 14,
		color: "#666",
		marginBottom: 10,
	},
	header: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 20,
	},
	tabsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 20,
	},
	tab: {
		paddingVertical: 8,
		paddingHorizontal: 20,
		borderBottomWidth: 2,
		borderBottomColor: "transparent",
	},
	activeTab: {
		borderBottomColor: "#004d40",
	},
	tabText: {
		fontSize: 14,
		color: "#666",
	},
	activeTabText: {
		color: "#004d40",
		fontWeight: "bold",
	},
	ordersContent: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 50,
	},
	noOrdersContainer: {
		backgroundColor: "#f8f8f8",
		padding: 20,
		borderRadius: 10,
		alignItems: "center",
	},
	noOrdersText: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#333",
	},
	noOrdersSubText: {
		fontSize: 16,
		color: "#666",
		marginBottom: 20,
	},
	orderNowButton: {
		backgroundColor: "#FFA000",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	orderNowButtonText: {
		fontSize: 14,
		color: "#fff",
		fontWeight: "bold",
	},
});

export default MyOrdersPage;
