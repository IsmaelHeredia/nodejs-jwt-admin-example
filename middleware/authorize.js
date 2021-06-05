const express = require('express');
const jwt = require('express-jwt');
const { secret } = require('config.json');
const db = require('../helpers/db');
const config = require('../config.json');

module.exports = {

    validate_login: function(req, res, next) {

        var jsonwebtoken = require('jsonwebtoken');
        var loginToken = req.cookies['jwt_cookie'];

        if(loginToken == null) {
            console.log('loginToken null');
            next();
        } else {
            jsonwebtoken.verify(loginToken, config.secret, function(err, decoded) {

                if(err) {
                    //console.log("err");
                    next();
                }

                var id = 0;

                if(decoded != null) {
                    id = decoded.sub;
                }

                const user = db.User.findByPk(id);

                if (!user) {
                    //console.log("user not found");
                    next();
                }

                res.redirect('/admin');
                
            });
        }

    },
    validate_admin: function(req, res, next) {

        var jsonwebtoken = require('jsonwebtoken');
        var loginToken = req.cookies['jwt_cookie'];

        if(loginToken == null) {
            //console.log('loginToken null');
            res.redirect('/');
        } else {
            jsonwebtoken.verify(loginToken, config.secret, function(err, decoded) {

                if(err) {
                    console.log('err');                    
                    res.redirect('/');
                }

                var id = 0;

                if(decoded != null) {
                    id = decoded.sub;
                }

                const user = db.User.findByPk(id);

                if (!user) {
                    //console.log('user not found');                    
                    res.redirect('/');
                }

                next();

            });
        }

    }
}