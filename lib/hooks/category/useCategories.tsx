import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../values";
import { useSession } from "@/lib/SessionProvider";

export type CategoryType = { name: string; categoryId: string; image: string };

export default function useCategories() {
	const { session } = useSession();

	return useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			try {
				const response = await axios.get<{ categories: CategoryType[] }>(
					`${BASE_URL}/category`,
					{
						headers: { Authorization: `${session}` },
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
