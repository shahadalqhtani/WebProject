/**
 *  Get Home Page
 */

exports.homepage = async(req, res) =>{
    const locals = {
        title: 'حيّك',
        description: ' ! يا هلا فيك بموقع حيّنا ',
    };
    res.render('index' , locals);
}

/**
 *  Get About us Page 
 */
exports.about = async(req, res) =>{
    const locals = {
        title: ' حيّك - من نحن',
        description: ' ! يا هلا فيك بموقع حيّنا ',
    };
    res.render('about' , locals);
}

/**
 *  Get FAQ  Page 
 */
exports.FAQ = async(req, res) =>{
    const locals = {
        title: ' حيّك - الأسئلة الشائعة',
        description: ' ! يا هلا فيك بموقع حيّنا ',
    };
    res.render('FAQ' , locals);
}
exports.login = async(req, res) =>{
    const locals = {
        title: ' حيّك - تسجيل الدخول',
        description: ' ! يا هلا فيك بموقع حيّنا ',
    };
    res.render('login' , locals);
}
exports.moreevents = async(req, res) =>{
    const locals = {
        title: ' حيّك - تسجيل الدخول',
        description: ' ! يا هلا فيك بموقع حيّنا ',
    };
    res.render('moreevents' , locals);
}


/**
 *  Get Shop Page 
 */
// controllers/mainController.js

exports.shop = async (req, res) => {
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
  
    const shops = [
     
    ];
  
    // Render shop page with the custom layout "mainShop"
    res.render("shop", { locals, categories, shops, layout: 'layouts/mainShop' });
  };
  
  
  /**
 *  Get Shop INSIDE BOXES 
 */
// controllers/mainController.js

exports.shopDetails = async (req, res) => {
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
  };
  
