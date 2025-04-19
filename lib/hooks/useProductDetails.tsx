import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../values";
import { useSession } from "@/lib/SessionProvider";
import { Product } from "../types";
import { productsDB } from "../fake-data";

export default function useProductDetails(productId: string) {
	const { session } = useSession();

	return useQuery({
		queryKey: ["product", productId],
		queryFn: async () => {
			try {
				const product = productsDB.find(
					(item) => item.product_id === productId
				);

				if (!!product) return product;

				const response = await axios.get(`${BASE_URL}/products/${productId}`, {
					headers: { Authorization: `${session}` },
				});

				if (response.data) {
					return response.data as Product;
				}
				return null;
			} catch (error) {
				console.log("Error in fetching categories", error);
				return null;
			}
		},
		enabled: !!session,
	});
}
