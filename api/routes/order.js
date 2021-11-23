const router = require('express').Router();
const Orders = require("../model/Orders");
const User = require("../model/User");
const verify = require('../verifyToken');
const env = require("dotenv");
env.config();
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.get('/get-order', verify, async (req, res) => {
    const orders = await Orders.findById('id').populate(['user', 'restaurant']);
    try {
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/make-payment", verify, async (req, res) => {
    try {
        const getUser = await User.findById(req.user.id);
        if (!getUser?.cust_id) {
            const customer = await Stripe.customers.create({
                email: req.user.email,
                name: "Uber App User",
                address: {
                    line1: '510 Townsend St',
                    postal_code: '98140',
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'US',
                },
            });
            req.user = await User.findByIdAndUpdate(req.user.id, { $set: { cust_id: customer.id } });
        }

        await Stripe.paymentMethods.attach(
            req.body.token,
            { customer: req.user.cust_id }
        );
        const paymentIntent = await Stripe.paymentIntents.create({
            amount: (req.body.price) * 100,
            currency: 'usd',
            payment_method_types: ['card'],
            customer: req.user.cust_id,
            payment_method: req.body.token,
            confirmation_method: 'automatic',
            description: 'Payment for food',
            shipping: {
                name: 'Pandi Selvam',
                address: {
                    line1: '510 Townsend St',
                    postal_code: '98140',
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'US',
                },
            },
            confirm: 'true',
        });

        const newOrder = new Orders({
            user: req.user.id,
            restaurant: req.body.restaurantId,
            price: req.body.price,
            menu_items: req.body.menu_items,
            status: true,
            txn_id: paymentIntent.id,
            response: paymentIntent
        });

        try {
            const order = await newOrder.save();
            res.status(200).json({ client_secret: paymentIntent.client_secret, order: order });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;