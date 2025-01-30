require('dotenv').config();

const express = require('express');
/// help  create diffrent layouts for our website 
const expressLayouts = require('express-ejs-layouts');

// Concect DB with our website - More... 1:15m
const connectDB = require('./server/config/db');

const app = express();
const port = 3000 || process.env.PORT;

// help pass data through pages
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//connect DB  
//connectDB();

// Static Files 
app.use(express.static('public'));

//Templating Engine 
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


//Router
app.use('/' , require('./server/routes/index'))
app.use('/' , require('./server/routes/saveditems'))   // هنا نحط الصفحة اللي اليوزر يدخل عليهاا ويشوف المفضلة (دقيقة 58 )
//app.use('/' , require('./server/routes/auth'))

//Handle 404 
app.get('*', function(req,res) {
    res.status(404).render('404');
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

