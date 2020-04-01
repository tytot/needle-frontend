"use strict";
const express = require('express');
const UserDB = require('./userdb');
const ProviderDB = require('./providerdb');
const config = require('./config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const exporter = require('sqlite-json')("sqlitedb")

const userDB = new UserDB("sqlitedb")
const providerDB = new ProviderDB("sqlitedb")
const app = express();
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// CORS middleware
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

app.use(allowCrossDomain)

router.post('/register', function(req, res) {
    userDB.insert([
        req.body.name,
        req.body.email,
        bcrypt.hashSync(req.body.password, 8)
    ],
    function (err) {
        if (err) return res.status(500).send(err)
        userDB.selectByEmail(req.body.email, (err,user) => {
            if (err) return res.status(500).send(err)
            let token = jwt.sign({ id: user.id }, config.secret, {expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token, user: user });
        });
    });
});

router.post('/register-admin', function(req, res) {
    userDB.insertAdmin([
        req.body.name,
        req.body.email,
        bcrypt.hashSync(req.body.password, 8),
        1
    ],
    function (err) {
        if (err) return res.status(500).send(err)
        userDB.selectByEmail(req.body.email, (err,user) => {
            if (err) return res.status(500).send(err)
            let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token, user: user });
        });
    });
});

router.post('/login', (req, res) => {
    userDB.selectByEmail(req.body.email, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send('No user found.');
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token, user: user });
    });
})

router.get('/providers', function(req, res) {
    exporter.json('select * FROM provider', (err, json) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(json)
    })
});

router.post('/add-provider', function(req, res) {
    providerDB.insert([
        req.body.facility,
        req.body.last_name,
        req.body.first_name,
        req.body.phone,
        req.body.email
    ],
    function (err) {
        if (err) return res.status(500).send(err)
        res.status(200).send('Success!')
    });
});

router.post('/remove-provider', function(req, res) {
    providerDB.delete([req.body.email],
    function (err) {
        if (err) return res.status(500).send(err)
        res.status(200).send('Success!')
    });
});

app.use(router)

let port = process.env.PORT || 3000;

let server = app.listen(port, function() {
    console.log('Express server listening on port ' + port)
});