require('dotenv').config();

const express = require('express');
/// help  create diffrent layouts for our website 
const expressLayouts = require('express-ejs-layouts');

// Concect DB with our website 
const connectDB = require('./server/config/db');

//when user log in it's keep it log in 
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

//const methodOverride = require("method-override");

const app = express();
const port = 3000 || process.env.PORT;

app.use(passport.initialize());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    }),
  }));

// help pass data through pages
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//connect DB  
connectDB();

// Static Files 
app.use(express.static('public'));

//Templating Engine 
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


//Router
app.use('/' , require('./server/routes/auth'))
app.use('/' , require('./server/routes/index'))
app.use('/' , require('./server/routes/saveditems'))   // هنا نحط الصفحة اللي اليوزر يدخل عليهاا ويشوف المفضلة (دقيقة 58 )


//Handle 404 
app.get('*', function(req,res) {
    res.status(404).render('404');
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

