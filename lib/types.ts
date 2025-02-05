export type HomePageItem = Product | HomePageCategoryItem;

export type HomePageCategoryItem = {
	id: string;
	category: string;
	title: string;
	image: string;
};

export type Product = {
	id: string;
	category: string;
	title: string;
	image: string;
	price: number;
	originalPrice: number | null;
	discountPercent?: number;
	reviews?: number;
	recentlyBought?: number;
	description?: string;
	healthConditions?: string[];
	ratings?: number;
};

// Type guard for HomePageCategoryItem
export function isHomePageCategoryItem(
	item: HomePageItem
): item is HomePageCategoryItem {
	return (
		(item as HomePageCategoryItem).category !== undefined &&
		(item as HomePageCategoryItem).title !== undefined &&
		(item as HomePageCategoryItem).image !== undefined &&
		(item as HomePageCategoryItem).id !== undefined &&
		(item as Product).price === undefined
	); // Ensure it's not a Product
}

// Type guard for Product
export function isProduct(item: HomePageItem): item is Product {
	return (item as Product).price !== undefined; // Check for price to identify Product
}

export type OnboardingItemType = {
	id: string;
	title: string;
	description: string;
	image: string;
};

// export type RootStackParamList = {
// 	Home: undefined;
// 	ShopPage: { healthCondition: string };
// 	ProductDetail: { productId: string };
// };
