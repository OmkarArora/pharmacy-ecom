import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Product } from "../types";

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
	addItem: (product: Product) => void;
	removeItem: (productId: string) => void;
	increaseQuantity: (productId: string) => void;
	decreaseQuantity: (productId: string) => void;
	clearCart: () => void;
	getTotalPrice: () => number;

	// Selectors
	selectProductQuantity: (state: State, productId: string) => number;
	selectTotalItemsCount: (state: State) => number;
};

const useCartStore = create<State & Actions>()(
	persist(
		(set, get) => ({
			items: [],
			addItem: (product) => {
				set((state) => {
					const existingItem = state.items.find(
						(item) => item.product.id === product.id
					);

					if (existingItem) {
						const updatedItems = state.items.map((item) =>
							item.product.id === product.id
								? { ...item, quantity: item.quantity + 1 }
								: item
						);
						return { items: updatedItems };
					} else {
						return { items: [...state.items, { product, quantity: 1 }] };
					}
				});
			},
			removeItem: (productId) => {
				set((state) => ({
					items: state.items.filter((item) => item.product.id !== productId),
				}));
			},
			increaseQuantity: (productId) => {
				set((state) => ({
					items: state.items.map((item) =>
						item.product.id === productId
							? { ...item, quantity: item.quantity + 1 }
							: item
					),
				}));
			},
			decreaseQuantity: (productId) => {
				set((state) => ({
					items: state.items.map((item) =>
						item.product.id === productId
							? { ...item, quantity: Math.max(1, item.quantity - 1) }
							: item
					),
				}));
			},
			clearCart: () => {
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
					(item) => item.product.id === productId
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
		}),
		{
			name: "cart-storage",
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);

export default useCartStore;
