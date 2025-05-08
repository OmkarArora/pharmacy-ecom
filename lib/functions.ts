/**
 * Rounds a number to two decimal places.
 *
 * @param num The number to round.
 * @returns The rounded number.
 */
export function roundToTwoDecimals(num: number): number {
	return Math.round(num * 100) / 100;
}

export function getDiscountedPrice(price: number, discount: number) {
	if (discount === 0) return price;
	return roundToTwoDecimals(Math.round(price - (price * discount) / 100));
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

export function generateAddressId() {
	const randomNumber = Math.floor(Math.random() * 10000)
		.toString()
		.padStart(4, "0");
	return `addr${randomNumber}`;
}
