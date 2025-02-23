import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../values";

export type CategoryType = { name: string };

export default function useCategories() {
	return useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			try {
				const response = await axios.get<{ categories: CategoryType[] }>(
					`${BASE_URL}/category`
				);
				if (response.data.categories) {
					return response.data.categories;
				}
				return [];
			} catch (error) {
				console.log("Error in fetching categories", error);
				return [];
			}
		},
	});
}
