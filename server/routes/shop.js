const express = require('express');
const router = express.Router();

router.get('/shop-details', (req, res) => {
    // Extract query parameters from URL
    const { name, category, image, location } = req.query;

    if (!name || !category || !image || !location) {
        return res.status(400).send("Missing required parameters.");
    }

    // Simulate database retrieval (Replace this with real DB calls if needed)
    const shopDetails = {
        name,
        category,
        image,
        location,
        averageRating: 4.5, // Placeholder, replace with real average rating
        isSaved: false, // Replace with DB check if the shop is saved
        reviews: [
            { name: "أحمد", rating: 5, text: "مطعم ممتاز!" },
            { name: "فاطمة", rating: 4, text: "طعام جيد ولكن الخدمة تحتاج لتحسين." }
        ]
    };

    // Render shop-details.ejs and pass shopDetails data
    res.render('shop-details', { shopDetails });
});

module.exports = router;
