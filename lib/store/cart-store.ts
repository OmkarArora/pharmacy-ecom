import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Product } from "../types";
import { addItemToCart, deleteItemFromCart } from "../hooks/cart/useCart";

// Define the structure of a product

// Define the structure of a cart item
export interface CartItem {
	product: Product;
	quantity: number;
}

type State = {
	items: CartItem[];
};

type Actions = {
	addItem: (product: Product, user_name: string, session: string) => void;
	removeItem: (productId: string, user_name: string, session: string) => void;
	increaseQuantity: (
		productId: string,
		user_name: string,
		session: string
	) => void;
	decreaseQuantity: (
		productId: string,
		user_name: string,
		session: string
	) => void;
	clearCart: (user_name: string, session: string) => void;
	getTotalPrice: () => number;
	resetData: () => void;

	// Selectors
	selectProductQuantity: (state: State, productId: string) => number;
	selectTotalItemsCount: (state: State) => number;
};

const initialData: State = {
	items: [],
};

const useCartStore = create<State & Actions>()(
	persist(
		(set, get) => ({
			...initialData,
			addItem: (product, user_name, session) => {
				const cartItems = get().items;
				const existingItem = cartItems.find(
					(item) => item.product.product_id === product.product_id
				);

				let updatedItems: CartItem[] = [];

				if (existingItem) {
					updatedItems = cartItems.map((item) =>
						item.product.product_id === product.product_id
							? { ...item, quantity: item.quantity + 1 }
							: item
					);
					updatedItems = updatedItems;

					addItemToCart(
						{
							user_name: user_name,
							product_id: product.product_id,
							quantity: existingItem.quantity + 1,
						},
						session
					);
				} else {
					updatedItems = [...cartItems, { product, quantity: 1 }];

					addItemToCart(
						{
							user_name: user_name,
							product_id: product.product_id,
							quantity: 1,
						},
						session
					);
				}

				set((state) => {
					return { items: updatedItems };
				});
			},
			removeItem: (productId, user_name, session) => {
				deleteItemFromCart(user_name, productId, session);

				set((state) => ({
					items: state.items.filter(
						(item) => item.product.product_id !== productId
					),
				}));
			},
			increaseQuantity: (productId, user_name, session) => {
				const cartItems = get().items;
				const cartItemIndex = cartItems.findIndex(
					(item) => item.product.product_id === productId
				);
				if (cartItemIndex < 0) return;

				const newProductItem = {
					...cartItems[cartItemIndex],
					quantity: cartItems[cartItemIndex].quantity + 1,
				};

				addItemToCart(
					{
						user_name: user_name,
						product_id: newProductItem.product.product_id,
						quantity: newProductItem.quantity,
					},
					session
				);

				set((state) => ({
					items: state.items.map((item) =>
						item.product.product_id === productId ? newProductItem : item
					),
				}));
			},
			decreaseQuantity: (productId, user_name, session) => {
				const cartItems = get().items;
				const cartItemIndex = cartItems.findIndex(
					(item) => item.product.product_id === productId
				);
				if (cartItemIndex < 0) return;

				const newProductItem = {
					...cartItems[cartItemIndex],
					quantity: Math.max(1, cartItems[cartItemIndex].quantity - 1),
				};

				addItemToCart(
					{
						user_name: user_name,
						product_id: newProductItem.product.product_id,
						quantity: newProductItem.quantity,
					},
					session
				);

				set((state) => ({
					items: state.items.map((item) =>
						item.product.product_id === productId ? newProductItem : item
					),
				}));
			},
			clearCart: () => {
				// clear-cart API
				set({ items: [] });
			},
			getTotalPrice: () => {
				return get().items.reduce(
					(total, item) => total + item.product.price * item.quantity,
					0
				);
			},
			selectProductQuantity: (state: State, productId) => {
				const existingItem = state.items.find(
					(item) => item.product.product_id === productId
				);

				if (existingItem) {
					return existingItem.quantity;
				} else {
					return 0;
				}
			},
			selectTotalItemsCount: (state: State) => {
				return state.items.reduce((acc, curr) => acc + curr.quantity, 0);
			},
			resetData: () => set({ ...initialData }),
		}),
		{
			name: "cart-storage",
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);

export default useCartStore;
