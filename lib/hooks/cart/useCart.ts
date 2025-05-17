import { useStorageState } from "@/hooks/useStorageState";
import { getAccessToken, useSession } from "@/lib/SessionProvider";
import { ORDERS_BASE_URL } from "@/lib/values";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useCart() {
	const { session } = useSession();
	const [[_, username]] = useStorageState("username");

	const cartDataQuery = useQuery({
		queryKey: ["get-cart"],
		queryFn: async () => {
			try {
				const response = await axios.get(
					`${ORDERS_BASE_URL}/get-cart?user_name=${username}`,
					{
						headers: { Authorization: `${await getAccessToken()}` },
					}
				);

				console.log("response", response);

				// if (response.data.orders) {
				//     return response.data.orders;
				// }
				return [];
			} catch (error) {
				console.log("Error in fetching my cart", error);
				return [];
			}
		},
		enabled: !!(session && username),
	});

	return { cartDataQuery };
}

export async function addItemToCart(
	data: {
		user_name: string;
		product_id: string;
		quantity: number;
	},
	session: string
) {
	return axios.post(`${ORDERS_BASE_URL}/add-cart`, data, {
		headers: { Authorization: `${await getAccessToken()}` },
	});
}

export async function deleteItemFromCart(
	user_name: string,
	product_id: string,
	session: string
) {
	return axios.delete(
		`${ORDERS_BASE_URL}/delete-item-cart?user_name=${user_name}product_id=${product_id}`,
		{
			headers: { Authorization: `${await getAccessToken()}` },
		}
	);
}
