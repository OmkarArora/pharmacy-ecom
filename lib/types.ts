export type ProductItem = {
	id: string;
	category: string;
	title: string;
	image: string;
	price: number | null;
	originalPrice: number | null;
	discount: number | null;
};

export type OnboardingItemType = {
	id: string;
	title: string;
	description: string;
	image: string;
};
