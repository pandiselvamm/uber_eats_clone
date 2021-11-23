const router = require('express').Router();
const User = require("../model/User");
const Crypto = require('crypto-js');
const verify = require('../verifyToken');

//UPDATE

router.put("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = Crypto.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString();
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You can update only your account ");
    }
});

//DELETE

router.delete("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted......")
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You can delete only your account ");
    }
});

//GET

router.get("/find/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const user = await User.findById(req.params.id);
            const { password, ...info } = user._doc;
            res.status(200).json(info)
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You can access only your account ");
    }
});

//GET ALL

router.get("/", verify, async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
        try {
            const users = query ? await User.find({ isAdmin: { $eq: false } }).sort({ _id: -1 }) : await User.find({ isAdmin: { $eq: false } });
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("Only admin can access");
    }
});

//GET USER STATS
router.get("/stats", async (req, res) => {
    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);

    try {
        const data = await User.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;