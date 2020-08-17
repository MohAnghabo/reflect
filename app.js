let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let session = require('cookie-session');
let flash = require('connect-flash');
let bodyParser = require('body-parser');
let passport = require('passport');

let indexRouter = require('./routes/index');
let thaiRouter = require('./routes/thai');
let japanesesRouter = require('./routes/japaneses');
let englishRouter = require('./routes/english');
let userRouter = require('./routes/login');


let firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyAhZ-nCy4kELFEu_m0LaPhpDoJ5-CWqYUI",
    authDomain: "reflect-auth-test-208ee.firebaseapp.com",
    databaseURL: "https://reflect-auth-test-208ee.firebaseio.com",
    projectId: "reflect-auth-test-208ee",
    storageBucket: "reflect-auth-test-208ee.appspot.com",
    messagingSenderId: "879981143647",
    appId: "1:879981143647:web:efdcbf07e21ce9dbd2ddea",
    measurementId: "G-VRBFNHY20K"
};

firebase.initializeApp(firebaseConfig);

let admin = require('firebase-admin');
let ServiceAccount = require('./config/ServiceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount)
});

let app = express();

require('./config/passport-setup');

let expiryDate = new Date(Date.now() + 60 * 60 * 1000)

app.use(session({
    name: 'session',
    keys: ['asgdfdfgaDGSDFG', 'asfsgdsfgsdfg'],
    cookie: {
        secure: true,
        httpOnly: true,
        expires: expiryDate
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(flash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', indexRouter);
app.use('/thai', thaiRouter);
app.use('/japanese', japanesesRouter);
app.use('/english', englishRouter);

app.use('/login', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    console.log(err)
    res.render('error', {err: err});
});

module.exports = app;