export type HomePageItem = Product | HomePageCategoryItem;

export type HomePageCategoryItem = {
	productId: string;
	category: string;
	name: string;
	image: string;
};

export type Product = {
	productId: string;
	name: string;
	description?: string;
	image: string;
	price: number;
	discount?: number;

	category: string;
	reviews?: number;
	recentlyBought?: number;
	healthConditions?: string[];
	ratings?: number;
};

// Type guard for HomePageCategoryItem
export function isHomePageCategoryItem(
	item: HomePageItem
): item is HomePageCategoryItem {
	return (
		(item as HomePageCategoryItem).category !== undefined &&
		(item as HomePageCategoryItem).name !== undefined &&
		(item as HomePageCategoryItem).image !== undefined &&
		(item as HomePageCategoryItem).productId !== undefined &&
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
