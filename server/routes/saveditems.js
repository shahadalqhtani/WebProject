const express = require('express');
const router = express.Router();
const saveditemsController = require('../controllers/saveditemsController');

/**
 *  SavedItems Routes 
 **/

router.get('/saveditems', saveditemsController.saveditems)

module.exports = router;
