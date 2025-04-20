import Header from "@/components/Header";
import useMyOrders from "@/lib/hooks/order/useMyOrders";
import { OrderType } from "@/lib/hooks/order/usePlaceOrder";
import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ordersSample = [
	{
		id: 1,
		name: "iPhone 15 Pro Max",
		status: "Arriving in 10 mins",
		tracking: [
			{ time: "9:00 AM", status: "Order Placed" },
			{ time: "10:00 AM", status: "Picked Up" },
			{ time: "10:30 AM", status: "Out for Delivery" },
			{ time: "10:40 AM", status: "Delivered" },
		],
	},
	{
		id: 2,
		name: "USB-C Charger",
		status: "Delivered",
		tracking: [],
	},
	{
		id: 3,
		name: "Wireless Headphones",
		status: "Cancelled",
		tracking: [],
	},
];

const MyOrders: React.FC = () => {
	const [selectedTab, setSelectedTab] = useState<
		"all" | "delivered" | "cancelled"
	>("all");
	const [showModal, setShowModal] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

	const { data } = useMyOrders();

	const handleTabChange = (tab: "all" | "delivered" | "cancelled") => {
		setSelectedTab(tab);
	};

	const handleOrderPress = (order: OrderType) => {
		setSelectedOrder(order);
		setShowModal(true);
	};

	const filteredOrders = ordersSample.filter((order) => {
		if (selectedTab === "all") return true;
		if (selectedTab === "delivered") return order.status === "Delivered";
		if (selectedTab === "cancelled") return order.status === "Cancelled";
		return false;
	});

	return (
		<>
			<SafeAreaView style={{ flex: 1 }}>
				<ScrollView style={styles.container}>
					<Header />

					{data?.map((order) => (
						<TouchableOpacity
							key={order.order_id}
							style={styles.orderCard}
							onPress={() => handleOrderPress(order)}
						>
							<Text style={styles.orderName}>{order.order_id}</Text>
							<Text style={styles.orderStatus}>{order.delivery_status}</Text>
						</TouchableOpacity>
					))}
					{/* 
					<View style={styles.tabsContainer}>
						{["all", "delivered", "cancelled"].map((tab) => (
							<TouchableOpacity
								key={tab}
								style={[styles.tab, selectedTab === tab && styles.activeTab]}
								onPress={() => handleTabChange(tab as any)}
							>
								<Text
									style={[
										styles.tabText,
										selectedTab === tab && styles.activeTabText,
									]}
								>
									{tab.charAt(0).toUpperCase() + tab.slice(1)}
								</Text>
							</TouchableOpacity>
						))}
					</View>

					{filteredOrders.length === 0 ? (
						<View style={styles.ordersContent}>
							<View style={styles.noOrdersContainer}>
								<Text style={styles.noOrdersText}>Uh oh! :)</Text>
								<Text style={styles.noOrdersSubText}>No Orders Found!</Text>
								<TouchableOpacity style={styles.orderNowButton}>
									<Text style={styles.orderNowButtonText}>ORDER NOW</Text>
								</TouchableOpacity>
							</View>
						</View>
					) : (
						filteredOrders.map((order) => (
							<TouchableOpacity
								key={order.id}
								style={styles.orderCard}
								onPress={() => handleOrderPress(order)}
							>
								<Text style={styles.orderName}>{order.name}</Text>
								<Text style={styles.orderStatus}>{order.status}</Text>
							</TouchableOpacity>
						))
					)} */}
				</ScrollView>

				<Modal
					visible={showModal}
					transparent
					animationType="slide"
					onRequestClose={() => setShowModal(false)}
				>
					<View style={styles.modalOverlay}>
						<View style={styles.modalContainer}>
							<Text style={styles.modalTitle}>Arriving in 10 mins</Text>
							<Text style={styles.modalSubtitle}>
								Tracking for: {selectedOrder?.order_id}
							</Text>

							<View style={styles.timeline}>
								{ordersSample[0]?.tracking.map((step, index) => (
									<View key={index} style={styles.timelineStep}>
										<View style={styles.checkboxFilled} />
										<View style={styles.timelineContent}>
											<Text style={styles.timelineStatus}>{step.status}</Text>
											<Text style={styles.timelineTime}>{step.time}</Text>
										</View>
									</View>
								))}
							</View>

							<TouchableOpacity
								style={styles.closeButton}
								onPress={() => setShowModal(false)}
							>
								<Text style={styles.closeButtonText}>Close</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
	orderCard: {
		backgroundColor: "#f0f0f0",
		padding: 15,
		borderRadius: 8,
		marginBottom: 15,
	},
	orderName: {
		fontSize: 16,
		fontWeight: "bold",
	},
	orderStatus: {
		fontSize: 14,
		color: "green",
		marginTop: 5,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "flex-end",
	},
	modalContainer: {
		backgroundColor: "#fff",
		padding: 20,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		maxHeight: "80%",
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#2193b0",
		marginBottom: 10,
	},
	modalSubtitle: {
		fontSize: 14,
		color: "#555",
		marginBottom: 20,
	},
	timeline: {
		paddingLeft: 10,
		borderLeftWidth: 2,
		borderLeftColor: "#2193b0",
		marginBottom: 20,
	},
	timelineStep: {
		flexDirection: "row",
		marginBottom: 15,
		alignItems: "flex-start",
	},
	checkboxFilled: {
		width: 14,
		height: 14,
		backgroundColor: "#2193b0",
		borderRadius: 7,
		marginRight: 10,
		marginTop: 3,
	},
	timelineContent: {
		flex: 1,
	},
	timelineStatus: {
		fontSize: 14,
		fontWeight: "bold",
	},
	timelineTime: {
		fontSize: 12,
		color: "#666",
	},
	closeButton: {
		backgroundColor: "#2193b0",
		paddingVertical: 10,
		borderRadius: 6,
	},
	closeButtonText: {
		color: "#fff",
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default MyOrders;
