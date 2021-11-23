const router = require('express').Router();
const Restaurant = require("../model/Restaurants");


//Get Restaurants Based On Location
router.get("/", async (req, res) => {
    const location = req.query.location;
    try {
        if (location && location != '') {
            Restaurant.find({ location: { $regex: '.*' + location + '.*', '$options': 'i' } }).then((response) => {
                res.status(200).json(response)
            });
        } else {
            Restaurant.find().sort({ title: 1 }).then((response) => {
                res.status(200).json(response)
            });
        }

    } catch (error) {
        res.status(500).json(error);
    }
});

//Create Restaurant
router.post("/", async (req, res) => {
    const newRestaurant = new Restaurant({
        title: req.body.title,
        image_url: req.body.image_url,
        price: req.body.price,
        location: req.body.location,
        categories: req.body.categories
    });

    try {
        const restaurant = await newRestaurant.save();
        res.status(200).json(restaurant)
    } catch (error) {
        res.status(500).json(error);
    }
});

//Update Restaurant
router.put("/:id", async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json(restaurant)
    } catch (error) {
        res.status(500).json(error);
    }
});

//Find Restaurant
router.get("/:id", async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        res.status(200).json(restaurant)
    } catch (error) {
        res.status(500).json(error);
    }
});

//Delete Restaurant
router.delete("/:id", async (req, res) => {
    try {
        await Restaurant.findByIdAndDelete(req.params.id);
        res.status(200).json("Restaurant has been deleted......")
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;