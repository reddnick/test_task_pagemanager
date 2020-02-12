const {UserModel} = require('../bin/sequelize');
const passport = require('passport');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const auth = require('../services/auth.service');

router.get('/register', function (req, res) {
    res.render('register.hbs')
});
router.post('/register', function (req, res, done) {
    UserModel.findOne({
        where: {username: req.body.username}
    })
        .then((user) => {
            let username = req.body.username
            if (user) {
                return res.status(409).render('register', {username, error: 'User already exist'});
            } else {
                UserModel.create(req.body)
                    .then(() => res.redirect('/security/login'))
                    .catch(err => console.log(err))
            }
        })
});

router.get('/login', function (req, res) {
    res.render('login.hbs')
});

router.post('/login', auth.local, function (req, res, done) {
        const token = jwt.sign({user: req.user}, process.env.SECRET_KEY);
        res.cookie('jwt', token);
        return res.redirect('/admin/pages')},
     function (err, req, res, next) {
         return res.status(401).render('login',   {error: 'Wrong username or password'})
     }
);

router.get('/logout', auth.jwt, function (req, res) {
    req.logout();
    res.cookie('jwt', null);
    res.redirect('/security/login');
});


module.exports = router;
