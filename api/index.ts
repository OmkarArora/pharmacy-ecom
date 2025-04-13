const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const cors = require('cors');
const {validateWebhookSignature} = require('razorpay/dist/utils/razorpay-utils');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Razorpay API Keys
const razorpay = new Razorpay({
    key_id: 'rzp_live_IhNOGiPLQYapWG', // Replace with your Razorpay Key ID
    key_secret: 'JeiM8SLnxg28ds3PpX1BQeio', // Replace with your Razorpay Key Secret
});

// Route to create an order
app.post('/create-order', async (req, res) => {
    const { amount, currency } = req.body;
    console.log(20);
    try {
        const options = {
            amount: amount * 100, // Amount in paise
            currency: currency,
            receipt: `receipt_${Math.random().toString(36).substring(7)}`, // Unique receipt ID
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to create order' });
    }
});

// Route to verify payment
app.post('/verify-payment', (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const secret = razorpay.key_secret;
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    try{
        const isValidSignature = validateWebhookSignature(body, razorpay_signature, secret);
        if(isValidSignature){
                res.status(200).json({ success: true, message: 'Payment verified successfully' });
        } else {
                res.status(400).json({ success: false, message: 'Payment verification failed' });
        }
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Payment verification failed abcd' });
    }

});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
module.exports = app;
