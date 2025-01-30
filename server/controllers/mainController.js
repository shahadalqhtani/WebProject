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
<<<<<<< HEAD
=======

>>>>>>> e91db50c6b49a06569876c4b140cca03055935e2
exports.login = async(req, res) =>{
    const locals = {
        title: ' حيّك - تسجيل الدخول',
        description: ' ! يا هلا فيك بموقع حيّنا ',
    };
    res.render('login' , locals);
}
<<<<<<< HEAD
=======

>>>>>>> e91db50c6b49a06569876c4b140cca03055935e2
