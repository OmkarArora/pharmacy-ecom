import { useStorageState } from "@/hooks/useStorageState";
import { getAccessToken, useSession } from "@/lib/SessionProvider";
import { Address } from "@/lib/store/address-store";
import { ADDRESS_BASE_URL } from "@/lib/values";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useAddress() {
	const [[_, username]] = useStorageState("username");
	const { session } = useSession();

	const addAddressMutation = useMutation({
		mutationFn: async (data: Address) => {
			return axios.put(`${ADDRESS_BASE_URL}/address`, data, {
				headers: { Authorization: `${await getAccessToken()}` },
			});
		},
	});

	const deleteAddressMutation = useMutation({
		mutationFn: async (address_id: string) => {
			return axios.delete(
				`${ADDRESS_BASE_URL}/address?address_id=${address_id}`,
				{
					headers: { Authorization: `${await getAccessToken()}` },
				}
			);
		},
	});

	const addressQuery =  useQuery({
		queryKey: ["get-address"],
		queryFn: async () => {
			try {
				const response = await axios.get(
					`${ADDRESS_BASE_URL}/address?user_name=${username}`,
					{
						headers: { Authorization: `${await getAccessToken()}` },
					}
				);
				if (response.data) {
					return response.data as Address[];
				}
				return [];
			} catch (error) {
				console.log("Error in fetching address", error);
				return [];
			}
		},
		enabled: !!(session && username)
	});

	return { addAddressMutation, deleteAddressMutation, addressQuery };
}
