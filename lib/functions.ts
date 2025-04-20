export function getDiscountedPrice(price: number, discount: number) {
	if (discount === 0) return price;
	return Math.round(price - (price * discount) / 100);
}

export function generateOrderId() {
	const randomNumber = Math.floor(Math.random() * 10000)
		.toString()
		.padStart(4, "0");
	return `order${randomNumber}`;
}

export function generateTransactionId() {
	const randomNumber = Math.floor(Math.random() * 10000)
		.toString()
		.padStart(4, "0");
	return `txn${randomNumber}`;
}
