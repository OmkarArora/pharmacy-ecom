import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../values";
import { Product } from "@/lib/types";
import { useSession } from "@/lib/SessionProvider";

export default function useCategoryProducts(categoryId: string) {
	const { session } = useSession();

	return useQuery({
		queryKey: ["category-products", categoryId],
		queryFn: async () => {
			try {
				const response = await axios.get<{ products: Product[] }>(
					`${BASE_URL}/products?category=${categoryId}`,
					{
						headers: { Authorization: `${session}` },
					}
				);
				if (response.data.products) {
					return response.data.products;
				}
				return [];
			} catch (error) {
				console.log("Error in fetching products", error);
				return [];
			}
		},
	});
}
