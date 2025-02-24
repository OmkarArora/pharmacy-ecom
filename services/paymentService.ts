export const processPayment = async (paymentData: any) => {
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
  
      // Mock payment success response
      return {
        success: true,
        message: "Payment processed successfully!",
      };
    } catch (error) {
      return {
        success: false,
        message: "Payment failed. Please try again.",
      };
    }
  };
  