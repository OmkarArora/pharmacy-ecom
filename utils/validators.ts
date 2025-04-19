export const validateEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
	const phoneRegex = /^[0-9]{10}$/; // Adjust for different country formats if needed
	return phoneRegex.test(phone);
};

export const validateRequired = (value: string): boolean => {
	return value.trim().length > 0;
};
