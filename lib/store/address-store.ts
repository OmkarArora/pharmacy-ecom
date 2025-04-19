import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Address {
	id: string;
	nickname: string;
	street: string;
	city: string;
	state: string;
	zipCode: string;
	latitude: number;
	longitude: number;
}

interface AddressStore {
	addresses: Address[];
	selectedAddress: Address | null;
	addAddress: (address: Omit<Address, "id">) => void;
	selectAddress: (address: Address) => void;
	removeAddress: (id: string) => void;
}

export const useAddressStore = create<AddressStore>()(
	persist(
		(set) => ({
			addresses: [],
			selectedAddress: null,
			addAddress: (address) => {
				const newAddressId = Math.random().toString();
				const newAddress = { ...address, id: newAddressId };
				set((state) => ({
					addresses: [...state.addresses, newAddress],
					selectedAddress: newAddress,
				}));
			},
			selectAddress: (address) => set({ selectedAddress: address }),
			removeAddress: (id) =>
				set((state) => ({
					addresses: state.addresses.filter((address) => address.id !== id),
					selectedAddress:
						state.selectedAddress?.id === id ? null : state.selectedAddress,
				})),
		}),
		{
			name: "address-storage",
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
