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
exports.shop = async (req, res) => {
    const locals = {
      title: "المحلات",
      description: "اكتشف أفضل الأماكن في منطقتك",
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
      { placeName: "مطعم الفيروز", category: "Resturants", location: "شارع الملك سعود", image: "/img/Shops/Resturant.jpeg" },
      { placeName: "مقهى لافندر", category: "Cafes", location: "شارع النهضة", image: "/img/Shops/Cafe.jpeg" },
      { placeName: "مدرسة النور الأهلية", category: "Education", location: "شارع الامير سلطان", image: "/img/Shops/Education.jpeg" },
      { placeName: "صالون لمسة الجمال", category: "Beauty", location: "شارع الزهور", image: "/img/Shops/Beauty.jpeg" },
      { placeName: "محل العائلة للتسوق", category: "Shops", location: "شارع العليا", image: "/img/Shops/Shop.jpeg" },
      { placeName: "حديقة الربيع", category: "Activity", location: "شارع الوادي", image: "/img/Shops/Activity-kids.jpeg" },
      { placeName: "مستشفى الرعاية الطبية", category: "Health", location: "شارع المستشفى", image: "/img/Shops/Hospital.jpeg" }
    ];
  
    res.render("shop", { locals, categories, shops });
  };
  
  
  /**
 *  Get Shop INSIDE BOXES 
 */
  exports.shopDetails = async (req, res) => {
    const locals = {
        title: req.query.name || 'تفاصيل المحل'
    };

    const shopDetails = {
        name: req.query.name,
        category: req.query.category,
        image: req.query.image,
        location: req.query.location
    };

    res.render('shop-details', { locals, shopDetails });
};
  
