import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL, ORDERS_BASE_URL } from "../../values";
import { getAccessToken, useSession } from "@/lib/SessionProvider";
import { useStorageState } from "@/hooks/useStorageState";
import { OrderType } from "./usePlaceOrder";

export type CategoryType = {
	name: string;
	category_id: string;
	image: string;
	description: string;
};

export default function useMyOrders() {
	const { session } = useSession();
	const [[_, username]] = useStorageState("username");

	return useQuery({
		queryKey: ["my-orders"],
		queryFn: async () => {
			try {
				const response = await axios.get<{ orders: OrderType[] }>(
					`${ORDERS_BASE_URL}/get-orders-by-user?user_name=${username}`,
					{
						headers: { Authorization: `${await getAccessToken()}` },
					}
				);

				if (response.data.orders) {
					return response.data.orders;
				}
				return [];
			} catch (error) {
				console.log("Error in fetching my orders", error);
				return [];
			}
		},
		enabled: !!(session && username),
	});
}
