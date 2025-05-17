import AddressForm from "@/components/address/AddressForm";
import { SelectAddressModal } from "@/components/AddressWidget";
import { PrimaryButton } from "@/components/ui/buttons";
import { useStorageState } from "@/hooks/useStorageState";
import { useThemeColor } from "@/hooks/useThemeColor";
import { getDiscountedPrice, roundToTwoDecimals } from "@/lib/functions";

import usePlaceOrder from "@/lib/hooks/order/usePlaceOrder";
import { useSession } from "@/lib/SessionProvider";
import { useAddressStore } from "@/lib/store/address-store";
import useCartStore, { CartItem as CartItemType } from "@/lib/store/cart-store";

import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

export default function CartPage() {
	const router = useRouter();
	const primaryColor = useThemeColor({}, "primary");
	const items = useCartStore((state) => state.items);
	const totalItemsInCart = useStore(
		useCartStore,
		useShallow((state) => state.selectTotalItemsCount(state))
	);

	// Address controls
	const { selectedAddress } = useAddressStore();
	const [isSelectModalVisible, setIsSelectAddressModalVisible] = useState(false);
	const [isFormVisible, setIsFormVisible] = useState(false);
	// ----------------

	const { placeOrder, isPending: isPlaceOrderPending } = usePlaceOrder();

	const [priceToPay, fullNoDiscountPrice] = useMemo(() => {
		let actualTotal = 0;
		let preDiscountTotal = 0;
		items.forEach((productCartItem) => {
			preDiscountTotal +=
				productCartItem.product.price * (productCartItem.quantity || 1);
			actualTotal +=
				getDiscountedPrice(
					productCartItem.product.price,
					productCartItem.product.discount || 0
				) * (productCartItem.quantity || 1);
		});

		return [actualTotal, preDiscountTotal];
	}, [items]);

	if (totalItemsInCart === 0) {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<ScrollView style={styles.container}>
					<View style={styles.cartHeader}>
						<Text style={styles.cartTitle}>MY CART</Text>
					</View>
					<View
						style={{
							flex: 1,
							justifyContent: "center",
							alignContent: "center",
						}}
					>
						<Text style={{ color: "#111111", fontSize: 20, padding: 16 }}>
							There are no items in the cart.
						</Text>

						<Image
							source={require("@/assets/images/cart/cart-empty.png")}
							// 	source={require(image)}
							// style={[styles.image, { width }]}
							style={{
								height: 300,
								width: 300,
								maxWidth: 330,
								alignSelf: "center",
							}}
							contentFit="contain"
						/>

						<View style={{ paddingHorizontal: 30 }}>
							<PrimaryButton
								title="Continue Shopping →"
								textStyle={{ fontWeight: "700" }}
								onPress={() => {
									router.push("/(tabs)");
								}}
							/>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={styles.container}>
				<View style={styles.cartHeader}>
					<Text style={styles.cartTitle}>MY CART</Text>
					<View style={styles.billSection}>
						<View style={styles.billAddress}>
							<Text style={styles.billTo}>Bill to --------</Text>
							{/* <Text style={styles.billLocation}>Delhi 110001</Text> */}
						</View>
						<TouchableOpacity>
							<Text style={[styles.addDetails, { color: primaryColor }]}>
								ADD DETAILS
							</Text>
						</TouchableOpacity>
					</View>
					{/* <View style={styles.offerSection}>
						<Text style={styles.offerText}>'DELZERO' Applied</Text>
						<TouchableOpacity>
							<Text style={styles.removeOffer}>X</Text>
						</TouchableOpacity>
					</View> */}
				</View>

				<View style={styles.cartDetails}>
					<Text style={styles.itemCount}>
						{items.length} {items.length === 1 ? "ITEM" : "ITEMS"} IN YOUR CART
					</Text>

					{items.map((item, index) => (
						<CartItem data={item} key={`${item}-${index}`} />
					))}

					{/* Last Minute Buys Section */}
					{/* <Text style={styles.lastMinuteTitle}>LAST MINUTE BUYS</Text>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						style={styles.lastMinuteScroll}
					>
						
						<View style={styles.lastMinuteItem}>
							<Image
								source={
									"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								}
								style={styles.lastMinuteImage}
							/>
							<Text style={styles.lastMinutePrice}>₹160</Text>
							<TouchableOpacity>
								<Text style={styles.addButton}>ADD</Text>
							</TouchableOpacity>
						</View>
			
					</ScrollView> */}

					{/* Cart Breakdown */}
					<View style={styles.cartBreakdown}>
						<Text style={styles.breakdownTitle}>CART BREAKDOWN</Text>
						<View style={styles.breakdownRow}>
							<Text>Cart Total</Text>
							<Text>₹{fullNoDiscountPrice}</Text>
						</View>
						<View style={styles.breakdownRow}>
							<Text>Discount on MRP</Text>
							<Text>
								-₹{roundToTwoDecimals(fullNoDiscountPrice - priceToPay)}
							</Text>
						</View>
						<View style={styles.breakdownRow}>
							<Text>Coupon Discount</Text>
							<Text>₹0</Text>
						</View>
						<View style={styles.breakdownRow}>
							<Text>Handling & Packaging Fee</Text>
							<Text>₹6</Text>
						</View>
						<View style={styles.breakdownRow}>
							<Text>Platform Fee</Text>
							<Text>₹3</Text>
						</View>
						<View style={styles.breakdownRow}>
							<Text>Delivery Charges</Text>
							<Text>FREE</Text>
						</View>
						<View style={styles.totalRow}>
							<Text>To Pay</Text>
							<Text>₹{priceToPay}</Text>
						</View>
						<View style={styles.savings}>
							<Text>
								You saved ₹
								{roundToTwoDecimals(fullNoDiscountPrice - priceToPay)} on this
								order
							</Text>
						</View>
					</View>

					{!!selectedAddress ? (
						<Text>
							Delivering to - {selectedAddress.type}, {selectedAddress.line1},{" "}
							{selectedAddress.line2}, {selectedAddress.city}
						</Text>
					) : (
						<TouchableOpacity
							style={[
								styles.addAddressButton,
								{ backgroundColor: primaryColor },
							]}
							onPress={() => setIsSelectAddressModalVisible(true)}
						>
							<Text style={styles.addAddressText}>ADD ADDRESS</Text>
						</TouchableOpacity>
					)}

					{!!selectedAddress && (
						<TouchableOpacity
							style={[
								styles.addAddressButton,
								{ backgroundColor: primaryColor },
							]}
							onPress={() => {
								// router.push("/checkout")
								placeOrder();
							}}
							disabled={isPlaceOrderPending}
						>
							<Text style={styles.addAddressText}>
								{isPlaceOrderPending ? "PLACING ORDER..." : "PLACE ORDER"}
							</Text>
						</TouchableOpacity>
					)}
				</View>

				{/* spacer */}
				<View style={{ height: 100, backgroundColor: "transparent" }}></View>
			</ScrollView>

			<SelectAddressModal
				isVisible={isSelectModalVisible}
				isFormVisible={isFormVisible}
				setIsVisible={setIsSelectAddressModalVisible}
				setIsFormVisible={setIsFormVisible}
				setIsSelectModalVisible={setIsSelectAddressModalVisible}
			/>
			<AddressForm
				isVisible={isFormVisible}
				onClose={() => setIsFormVisible(false)}
			/>

			{/* <FullScreenLoader visible={isPlaceOrderPending} text="Placing order..." /> */}
		</SafeAreaView>
	);
}

function CartItem({ data }: { data: CartItemType }) {
	const { product, quantity } = data;
	const { image, name, price } = product;

	const increaseQuantity = useCartStore((state) => state.increaseQuantity);
	const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
	const removeItem = useCartStore((state) => state.removeItem);

	const { session } = useSession();
	const [[_, username]] = useStorageState("username");

	return (
		<View style={styles.item}>
			<Image source={image} style={styles.itemImage} />
			<View style={styles.itemDetails}>
				<Text style={styles.itemTitle}>{name}</Text>
				<View style={styles.itemQuantity}>
					{quantity === 1 ? (
						<TouchableOpacity
							onPress={() =>
								removeItem(product.product_id, username || "", session || "")
							}
						>
							<MaterialIcons name="delete" size={16} />
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							onPress={() =>
								decreaseQuantity(
									product.product_id,
									username || "",
									session || ""
								)
							}
						>
							<MaterialIcons name="remove-circle-outline" size={16} />
						</TouchableOpacity>
					)}

					<Text style={styles.quantity}>{quantity}</Text>
					<TouchableOpacity
						onPress={() =>
							increaseQuantity(
								product.product_id,
								username || "",
								session || ""
							)
						}
					>
						<MaterialIcons name="add-circle-outline" size={16} />
					</TouchableOpacity>
				</View>
				<Text style={styles.itemPrice}>₹{price}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	cartHeader: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	cartTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#004080",
	},
	billSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 8,
	},
	billAddress: {
		flex: 1,
	},
	billTo: {
		fontSize: 14,
		color: "#666",
	},
	billLocation: {
		fontSize: 14,
		color: "#666",
	},
	addDetails: {
		color: "#FF8C00",
		fontWeight: "bold",
	},
	offerSection: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 8,
		backgroundColor: "#E6F9F7",
		padding: 8,
		borderRadius: 4,
	},
	offerText: {
		flex: 1,
		color: "#004080",
	},
	removeOffer: {
		color: "#FF8C00",
	},
	cartDetails: {
		padding: 16,
	},
	itemCount: {
		fontSize: 16,
		fontWeight: "bold",
	},
	item: {
		flexDirection: "row",
		marginVertical: 16,
	},
	itemImage: {
		width: 80,
		height: 80,
		borderRadius: 4,
		backgroundColor: "#eee",
	},
	itemDetails: {
		flex: 1,
		marginLeft: 16,
	},
	itemTitle: {
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 8,
	},
	itemQuantity: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	quantityButton: {
		padding: 8,
		fontSize: 18,
		fontWeight: "bold",
		color: "#FF8C00",
	},
	quantity: {
		marginHorizontal: 8,
		fontSize: 16,
	},
	itemPrice: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#004080",
	},
	lastMinuteTitle: {
		fontSize: 16,
		fontWeight: "bold",
		marginVertical: 16,
	},
	lastMinuteScroll: {
		flexDirection: "row",
	},
	lastMinuteItem: {
		alignItems: "center",
		marginRight: 16,
	},
	lastMinuteImage: {
		width: 80,
		height: 80,
		borderRadius: 4,
		backgroundColor: "#eee",
	},
	lastMinutePrice: {
		fontSize: 14,
		fontWeight: "bold",
		marginTop: 8,
	},
	addButton: {
		color: "#FF8C00",
		fontWeight: "bold",
	},
	cartBreakdown: {
		marginTop: 16,
		padding: 16,
		backgroundColor: "#f9f9f9",
		borderRadius: 4,
	},
	breakdownTitle: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 8,
	},
	breakdownRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 4,
	},
	totalRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 8,
		fontSize: 16,
		fontWeight: "bold",
	},
	savings: {
		marginTop: 16,
		padding: 8,
		backgroundColor: "#E6F9F7",
		borderRadius: 4,
		textAlign: "center",
	},
	addAddressButton: {
		marginTop: 16,
		padding: 16,
		backgroundColor: "#FF8C00",
		borderRadius: 4,
		alignItems: "center",
	},
	addAddressText: {
		color: "#fff",
		fontWeight: "bold",
	},
});
