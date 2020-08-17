let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

let firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

const admin = require('firebase-admin');

passport.serializeUser(function (user, done) {
    // console.log("passport.serializeUser: ", user);
    done(null, user.uid);
});

passport.deserializeUser(function (id, done) {
    admin.auth().getUser(id)
        .then((user) => {
            let userOBJ = {
                displayName: user.displayName || user.email,
                email: user.email
            };
            done(null, userOBJ);
        }).catch((err) => {
        console.log(err);
    });
});

passport.use('localAdmin', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, done) => {
        console.log({
            username: username,
            password: password
        });

        firebase.auth().signInWithEmailAndPassword(username, password)
            .then(() => {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        console.log("welcome again " + user.displayName);
                        console.log("signed user: ", user.providerData);
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                });
            }).catch((err) => {
            return done(null, false, {
                message: "Wrong username/password"
            });
        });
    }
));