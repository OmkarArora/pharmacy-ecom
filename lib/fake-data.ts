import { HomePageCategoryItem, Product } from "./types";

export const productsDB: Product[] = [
	{
		product_id: "1111",
		category: "Product of the Day",
		name: "OZiva Shaker Green, 600 ml",
		image:
			"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		rating_count: 3.8,
		price: 499,
		discount: 10,
		reviews: 100,
		recentlyBought: 200,
		description: "This is a description of the product",
	},
	{
		product_id: "2222",
		category: "Product of the Day",
		name: "Apollo Life Biotin 5000 mcg, 60 Tablets",
		image:
			"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		rating_count: 4.5,
		price: 475,
		discount: 5,
		reviews: 150,
		recentlyBought: 250,
		description: "This is a description of the product",
	},
	{
		product_id: "7777",
		category: "Top Brands",
		name: "Pantene Shampoo, 600 ml",
		image:
			"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		rating_count: 4.5,
		price: 499,
		discount: 3,
		reviews: 100,
		recentlyBought: 200,
		description: "This is a description of the product",
	},
	{
		product_id: "8888",
		category: "Top Brands",
		name: "VLCC Ayurveda Deep Pore Cleansing Face Wash",
		image:
			"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		rating_count: 4.5,
		price: 130,
		discount: 8,
		reviews: 120,
		recentlyBought: 180,
		description: "This is a description of the product",
	},
];

export const homePageCategoryItemsDB: HomePageCategoryItem[] = [
	{
		product_id: "4",
		category: "browseByHealthCondition",
		name: "Diabetes",
		image:
			"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		product_id: "5",
		category: "browseByHealthCondition",
		name: "Cardiac Care",
		image:
			"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		product_id: "6",
		category: "browseByHealthCondition",
		name: "Stomach Care",
		image:
			"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
];
