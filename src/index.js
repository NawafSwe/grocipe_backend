/* eslint-disable no-undef */
/* -------------- importing packages and files ---------------------- */
'use strict';
const spoonRouter = require('./routes/spoonRouter'),
	userRouter = require('./routes/userRouter'),
	User = require('./models/user'),
	ingredientRouter = require('./routes/ingredientRouter'),
	recipeRouter = require('./routes/recipeRouter'),
	groceryRouter = require('./routes/groceryItemRouter'),
	express = require('express'),
	bodyParser = require('body-parser'),
	expressValidator = require('express-validator'),
	mongoose = require('mongoose'),
	// passport = require('passport'),
	authenticationRouter = require('./routes/authenticationRouter'),
	cors = require('cors');

/* -------------- choosing Env ---------------------- */
if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') {
	require('custom-env').env(process.env.NODE_ENV);
} else {
	require('dotenv').config();
}

/* ----------------------- Configuring App -----------------------*/
const app = express();
app.use(cors());
app.use(expressValidator());
app.use(express.json());

/*----------------- Establishing Connection to DB -----------------*/
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(
	MONGO_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	},
	(err, db) => {
		//testing the connectivity of the DB
		if (err) console.log('error to connect to the database', err);
		else console.log('successfully connected to the database', 'grocipeApp');
	}
);

/* -------------- checking backend health ---------------------- */
app.get('/', (_, res) => {
	res.json({ welcome: 'Hello World' }).status(200);
});

/* ----------------------- Configuring Passport  -----------------------*/

// app.use((req, res, next) => {
// 	req.secret = {
// 		cookie: { maxAge: 86400000 },
// 		resave: true,
// 		saveUninitialized: true,
// 		store: new MemoryStore({
// 			checkPeriod: 86400000 // prune expired entries every 24h
// 		}),
// 		secret: process.env.SECRET
// 	};
// });

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(User.createStrategy());

// /* passport serialize and deserialize are response of reading the data
// from session decoded and encoded save and delete  */
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

/* -------------- routers ---------------------- */
app.use('/spoon', spoonRouter);
app.use('/users', userRouter);
app.use('/ingredients', ingredientRouter);
app.use('/recipes', recipeRouter);
app.use('/groceryItems', groceryRouter);
app.use(authenticationRouter);

/* -------------- establishing connection ---------------------- */
const PORT = process.env.PORT || 6666;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => console.log(`Server running on http://${HOST}:${PORT}`) );

