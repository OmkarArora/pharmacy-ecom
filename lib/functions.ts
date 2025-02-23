export function getDiscountedPrice(price: number, discount: number) {
	if (discount === 0) return price;
	return price - (price * discount) / 100;
}
