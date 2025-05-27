import React, { useState } from "react";
import Header from "@/components/Header";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useMyOrders from "@/lib/hooks/order/useMyOrders";
import { Item } from "@/lib/hooks/order/usePlaceOrder";

const MyOrders: React.FC = () => {
	const [selectedOrder, setSelectedOrder] = useState<any>(null);
	const [showModal, setShowModal] = useState(false);
	const ordersQuery = useMyOrders();
	const {data: ordersData} = ordersQuery;

	const openModal = (order: any) => {
		setSelectedOrder(order);
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		setSelectedOrder(null);
	};

	const getStatusStyle = (status: string) => {
		switch (status) {
			case "order_accepted":
				return { backgroundColor: "#e0f7e9", color: "#2e7d32" };
			case "Cancelled":
				return { backgroundColor: "#ffebee", color: "#c62828" };
			case "order_placed":
				return { backgroundColor: "#fff8e1", color: "#f9a825" };
			default:
				return { backgroundColor: "#e0e0e0", color: "#555" };
		}
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<Header />
			<Text style={styles.headerTitle} >My Orders</Text>

			<ScrollView contentContainerStyle={styles.container}>
				{ordersData?.map((order) => {
					const statusStyle = getStatusStyle(order.delivery_status);
					return (
						<TouchableOpacity
							key={order.order_id}
							style={styles.orderCard}
							onPress={() => openModal(order)}
						>
							<View style={styles.orderHeader}>
								<Text style={styles.orderId}>Order Id: {order.order_id}</Text>
								<Text
									style={[
										styles.orderStatus,
										{
											backgroundColor: statusStyle.backgroundColor,
											color: statusStyle.color,
										},
									]}
								>
									{order.delivery_status}
								</Text>
							</View>

							{/* <Text style={styles.timestamp}>
								Placed on: {order.updated_at.toDateString()}
							</Text> */}

							<View style={styles.medicineList}>
								{order.items.map((med: Item, index: number) => (
									<View key={index} style={styles.medicineItem}>
									<Text style={styles.productName}>• {med.name}</Text>
									
									{/* <Text style={styles.productPriceQty}>
										₹{med.price} x {med.quantity} 
									</Text> */}
									
									</View>
								))}
							</View>

							<View style={styles.orderFooter}>
								<Text style={styles.totalText}>₹{order.total_amount.toFixed(2)}</Text>
								<Text style={styles.viewDetails}>View Details</Text>
							</View>
						</TouchableOpacity>
					);
				})}
			</ScrollView>

			<Modal
				visible={showModal}
				transparent
				animationType="slide"
				onRequestClose={closeModal}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>
							Order Id: {selectedOrder?.order_id}
						</Text>
						<Text style={styles.modalSubtitle}>
							Status: {selectedOrder?.delivery_status}
						</Text>

						<Text style={styles.modalSectionTitle}>Medicines</Text>
						{selectedOrder?.items.map((med: Item, index: number) => (
						<View key={index} style={{ marginBottom: 10 }}>
							<Text style={styles.modalMedicineItem}>• {med.name}</Text>
							{/* <Text style={styles.productPriceQty}>
							₹{med.price} × {med.quantity}
							</Text> */}
						</View>
						))}
						
						<TouchableOpacity style={styles.closeButton} onPress={closeModal}>
							<Text style={styles.closeButtonText}>Close</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

export default MyOrders;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: "#ffffff",
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: "600",
		color: "#1a1a1a",
	},
	container: {
		padding: 16,
	},
	orderCard: {
		backgroundColor: "#fff",
		borderRadius: 16,
		padding: 18,
		marginBottom: 20,
		elevation: 4,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
	},
	orderHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 6,
	},
	orderId: {
		fontSize: 17,
		fontWeight: "600",
		color: "#222",
	},
	orderStatus: {
		fontSize: 13,
		fontWeight: "bold",
		paddingVertical: 4,
		paddingHorizontal: 10,
		borderRadius: 12,
		overflow: "hidden",
	},
	timestamp: {
		fontSize: 12,
		color: "#888",
		marginBottom: 12,
	},
	medicineList: {
		marginBottom: 12,
	},
	medicineItem: {
		fontSize: 15,
		color: "#333",
		paddingVertical: 2,
	},
	orderFooter: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	totalText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#1a73e8",
	},
	viewDetails: {
		fontSize: 13,
		color: "#1a73e8",
		fontWeight: "600",
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "flex-end",
	},
	modalContent: {
		backgroundColor: "#fff",
		padding: 24,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#0d47a1",
		marginBottom: 6,
	},
	modalSubtitle: {
		fontSize: 14,
		color: "#666",
		marginBottom: 20,
	},
	modalSectionTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 10,
	},
	modalMedicineItem: {
		fontSize: 15,
		marginBottom: 6,
		color: "#333",
	},
	modalTotal: {
		fontSize: 16,
		fontWeight: "bold",
		marginTop: 20,
		color: "#1a73e8",
	},
	closeButton: {
		marginTop: 24,
		backgroundColor: "#1a73e8",
		paddingVertical: 12,
		borderRadius: 8,
	},
	closeButtonText: {
		color: "#fff",
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 15,
	},
	productName: {
	fontWeight: "bold",
	fontSize: 16,
	},
	productMeta: {
	color: "#666",
	fontSize: 13,
	},
	productPriceQty: {
	fontSize: 14,
	color: "#333",
	marginTop: 2,
	},
	productManufacturer: {
	fontStyle: "italic",
	fontSize: 12,
	color: "#888",
	}

});
