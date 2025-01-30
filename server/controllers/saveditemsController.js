const ourwebsite = require('../models/ourwebsite');
const mongoose = require('mongoose')

/**
 *  Get savesItems Page
 */

exports.saveditems = async(req, res) =>{
    const locals = {
        title: 'المفضلة',
        description: ' ! يا هلا فيك بموقع حيّنا ',
    }

    res.render('saveditems/index' , {
        locals,
        layout: '../views/layouts/saveditems'
    });
}
