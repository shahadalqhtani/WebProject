const saveditem = require('../models/Event');
const mongoose = require('mongoose')

/**
 *  Get savesItems Page
 */

exports.saveditems = async(req, res) =>{
    const locals = {
        title: 'المفضلة',
        description: ' ! يا هلا فيك بموقع حيّنا ',
    }

    try {
        const saved = await Save.find({})
      
        
        
    } catch (error) {
        
    }


    res.render('saveditems/index' , {
        userName: req.user.firstName,
        locals,
        layout: '../views/layouts/saveditems'
    });
}

  
    
