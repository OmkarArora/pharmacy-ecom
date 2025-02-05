import { HomePageCategoryItem, Product } from "./types";

export const productsDB: Product[] = [
	{
		id: "1",
		category: "Product of the Day",
		title: "OZiva Shaker Green, 600 ml",
		image:
			"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		ratings: 4.5,
		price: 499,
		discountPercent: 3,
		originalPrice: 599,
		reviews: 100,
		recentlyBought: 200,
		description: "This is a description of the product",
	},
	{
		id: "2",
		category: "Product of the Day",
		title: "Apollo Life Biotin 5000 mcg, 60 Tablets",
		image:
			"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		ratings: 4.5,
		price: 475,
		discountPercent: 10,
		originalPrice: 525,
		reviews: 150,
		recentlyBought: 250,
		description: "This is a description of the product",
	},
	{
		id: "7",
		category: "Top Brands",
		title: "Pantene Shampoo, 600 ml",
		image:
			"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		ratings: 4.5,
		price: 499,
		discountPercent: 3,
		originalPrice: 599,
		reviews: 100,
		recentlyBought: 200,
		description: "This is a description of the product",
	},
	{
		id: "8",
		category: "Top Brands",
		title: "VLCC Ayurveda Deep Pore Cleansing Face Wash",
		image:
			"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		ratings: 4.5,
		price: 130,
		discountPercent: 3,
		originalPrice: 150,
		reviews: 120,
		recentlyBought: 180,
		description: "This is a description of the product",
	},
];

export const homePageCategoryItemsDB: HomePageCategoryItem[] = [
	{
		id: "4",
		category: "browseByHealthCondition",
		title: "Diabetes",
		image:
			"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		id: "5",
		category: "browseByHealthCondition",
		title: "Cardiac Care",
		image:
			"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		id: "6",
		category: "browseByHealthCondition",
		title: "Stomach Care",
		image:
			"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
];
