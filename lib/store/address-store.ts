import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { generateAddressId } from "../functions";

export interface Address {
	address_id: string;
	line1: string;
	line2: string;
	city: string;
	state: string;
	pincode: string;
	latitude: number;
	longitude: number;
	created_at: string;
	updated_at: string;
	is_default: boolean;
	type: string;
	user_name: string;
	area: string;
}

export function getEmptyAddressObject(): Address {
	return {
		address_id: generateAddressId(),
		type: "",
		line1: "",
		line2: "",
		city: "",
		state: "",
		pincode: "",
		latitude: 0,
		longitude: 0,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
		is_default: false,
		user_name: "",
		area: "",
	};
}

/**
 {
  "address_id": "addr002",
  "city": "Hyderabad",
  "created_at": "2025-03-20T09:00:00Z",
  "is_default": true,
  "latitude": 17.4492,
  "line1": "Tech Park Tower 3",
  "line2": "Hitech City",
  "longitude": 78.3828,
  "pincode": "500081",
  "state": "Telangana",
  "type": "work",
  "updated_at": "2025-03-25T09:30:00Z",
  "user_name": "01637d9a-a061-70d1-a336-f360ba9c3403"
}
 */

interface AddressStore {
	addresses: Address[];
	selectedAddress: Address | null;
	addAddress: (address: Omit<Address, "id">) => void;
	selectAddress: (address: Address) => void;
	removeAddress: (id: string) => void;
	resetData: () => void;
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
					addresses: state.addresses.filter(
						(address) => address.address_id !== id
					),
					selectedAddress:
						state.selectedAddress?.address_id === id
							? null
							: state.selectedAddress,
				})),
			resetData: () => set({ addresses: [] }),
		}),
		{
			name: "address-storage",
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
