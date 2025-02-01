// server/routes/shop.js

const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Route for the Shop Page
router.get('/shop', (req, res) => {
  const locals = {
    title: 'المحلات',
    description: 'اكتشف أفضل الأماكن في منطقتك',
  };
  
  const categories = [
    { key: "Resturants", name: "المطاعم" },
    { key: "Cafes", name: "المقاهي" },
    { key: "Education", name: "التعليم" },
    { key: "Beauty", name: "الجمال" },
    { key: "Shops", name: "المحلات" },
    { key: "Activity", name: "الفعاليات" },
    { key: "Health", name: "الصحة" }
  ];

  // Render shop page with mainShop layout
  res.render("shop", { locals, categories, shops, layout: 'layouts/mainShop' });
});

// Route for Shop Details Page
router.get('/shop-details', (req, res) => {
  const { name, category, image, location } = req.query;

  if (!name || !category || !image || !location) {
    return res.status(400).send("Missing required parameters.");
  }

  const shopDetails = {
    name,
    category,
    image,
    location,
    averageRating: 4.5, 
    isSaved: false, 
    reviews: [
      { name: "أحمد", rating: 5, text: "مطعم ممتاز!" },
      { name: "فاطمة", rating: 4, text: "طعام جيد ولكن الخدمة تحتاج لتحسين." }
    ]
  };

  // Render shop details page with mainShop layout
  res.render('shop-details', { shopDetails, layout: 'layouts/mainShop' });
});

module.exports = router;
