import { ORDERS_BASE_URL } from "@/lib/values";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useToastStore from "@/lib/store/toast-store";
import useCartStore from "@/lib/store/cart-store";
import { useRouter } from "expo-router";
import { useStorageState } from "@/hooks/useStorageState";
import { useSession } from "@/lib/SessionProvider";
import {
	generateOrderId,
	generateTransactionId,
	getDiscountedPrice,
} from "@/lib/functions";

import { useAddressStore } from "@/lib/store/address-store";

export interface OrderType {
	order_id: string;
	address_id: string;
	delivered_at: null;
	delivery_partner_id: string;
	delivery_status: string;
	discount: number;
	expected_delivery_date: Date;
	final_amount: number;
	items: Item[];
	ordered_at: Date;
	order_notes: string;
	// pharmacy_id: string;
	prescription_required: boolean;
	prescription_url: string;
	status: string;
	total_amount: number;
	transaction_id: string;
	updated_at: Date;
	user_name: string;
}

export interface Item {
	product_id: string;
	quantity: number;
	price: number;
}

export default function usePlaceOrder() {
	const showToast = useToastStore((state) => state.show);
	const cartItems = useCartStore((state) => state.items);
	const clearCart = useCartStore((state) => state.clearCart);
	const router = useRouter();

	const selectedAddress = useAddressStore((state) => state.selectedAddress);

	const [[_, username]] = useStorageState("username");
	const { session } = useSession();

	const mutation = useMutation({
		mutationFn: (data: OrderType) => {
			return axios.post(`${ORDERS_BASE_URL}/create-order`, data, {
				headers: { Authorization: `${session}` },
			});
		},
		onSuccess: () => {
			clearCart(username || "", session || "");
			showToast("Order placed successfully!");

			setTimeout(() => {
				router.push("/(tabs)");
			}, 1000);
		},
	});

	function getOrderValues() {
		let actualTotal = 0;
		let preDiscountTotal = 0;
		cartItems.forEach((productCartItem) => {
			preDiscountTotal +=
				productCartItem.product.price * (productCartItem.quantity || 1);
			actualTotal +=
				getDiscountedPrice(
					productCartItem.product.price,
					productCartItem.product.discount || 0
				) * (productCartItem.quantity || 1);
		});

		return [actualTotal, preDiscountTotal, preDiscountTotal - actualTotal];
	}

	function placeOrder() {
		const products: Item[] = cartItems.map((item) => ({
			product_id: item.product.product_id,
			quantity: item.quantity,
			price: getDiscountedPrice(item.product.price, item.product.discount || 0),
		}));

		const [priceToPay, preDiscountTotal, discount] = getOrderValues();

		const orderDetails: OrderType = {
			order_id: generateOrderId(),
			address_id: selectedAddress?.address_id || "",
			delivered_at: null,
			delivery_partner_id: "",
			delivery_status: "order_placed",
			discount: discount,
			expected_delivery_date: new Date(),
			final_amount: priceToPay,
			items: products,
			ordered_at: new Date(),
			order_notes: "",
			// pharmacy_id: "",
			prescription_required: false,
			prescription_url: "",
			status: "",
			total_amount: preDiscountTotal,
			transaction_id: generateTransactionId(),
			updated_at: new Date(),
			user_name: username || "",
		};
		mutation.mutate(orderDetails);
	}

	return {
		placeOrder,
		isPending: mutation.isPending,
		error: mutation.error,
		data: mutation.data,
		isSuccess: mutation.isSuccess,
		reset: mutation.reset,
	};
}
