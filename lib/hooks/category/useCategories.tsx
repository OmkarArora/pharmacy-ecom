import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../values";
import { getAccessToken, useSession } from "@/lib/SessionProvider";

export type CategoryType = {
	name: string;
	category_id: string;
	image: string;
	description: string;
};

export default function useCategories() {
	const { session } = useSession();

	return useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			try {
				const response = await axios.get<{ categories: CategoryType[] }>(
					`${BASE_URL}/categories`,
					{
						headers: { Authorization: `${await getAccessToken()}` },
					}
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
		enabled: !!session,
	});
}
