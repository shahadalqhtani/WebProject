const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware/checkAuth')
const saveditemsController = require('../controllers/saveditemsController');

/**
 *  SavedItems Routes 
 **/

// add isLoggedIn to the get  1;46

router.get('/saveditems', isLoggedIn, saveditemsController.saveditems);

module.exports = router;
