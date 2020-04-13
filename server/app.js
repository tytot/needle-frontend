"use strict";
const express = require('express');
const UserDB = require('./userdb');
const ProviderDB = require('./providerdb');
const config = require('./config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const exporter = require('sqlite-json')("sqlitedb")
const uuidv4 = require('uuid').v4;

const userDB = new UserDB("sqlitedb")
const providerDB = new ProviderDB("sqlitedb")
const app = express();
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// CORS middleware
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

app.use(allowCrossDomain)

router.post('/register', function (req, res) {
    userDB.insert([
        req.body.name,
        req.body.email,
        bcrypt.hashSync(req.body.password, 8)
    ],
        function (err) {
            if (err) return res.status(500).send(err);
            userDB.selectByName(req.body.name, (err, user) => {
                if (err) return res.status(500).send(err)
                let token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ auth: true, token: token, user: user });
            });
        });
});

router.post('/register-admin', function (req, res) {
    userDB.insertAdmin([
        req.body.name,
        req.body.email,
        bcrypt.hashSync(req.body.password, 8),
        1
    ],
        function (err) {
            if (err) return res.status(500).send(err);
            userDB.selectByName(req.body.name, (err, user) => {
                if (err) return res.status(500).send(err)
                let token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ auth: true, token: token, user: user });
            });
        });
});

router.post('/login', (req, res) => {
    userDB.selectByName(req.body.name, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send('No user found.');
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token, user: user });
    });
})

router.get('/providers', function (req, res) {
    exporter.json('select * FROM provider', (err, json) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(json)
    })
});

router.get('/providers/:uuid', function (req, res) {
    providerDB.selectByUUID(req.params.uuid, (err, user) => {
        if (err) return res.status(500).send('An error occurred.');
        if (!user) return res.status(404).send('UUID does not match any provider.');
        res.status(200).send({ user: user });
    });
});

router.post('/query', function (req, res) {
    exporter.json('select * FROM provider', (err, json) => {
        if (err) return res.status(500).send(err)
        let cache = `<CSD xmlns="urn:ihe:iti:csd:2013" xmlns:csd="urn:ihe:iti:csd:2013">
            <organizationDirectory/>
            <serviceDirectory/>
            <facilityDirectory/>
            <providerDirectory>`
        for (let contact of JSON.parse(json)) {
            const csd = `
                <provider entityID="urn:uuid:${contact.uuid}">
                    <demographic>
                    <name>
                        <commonName>${contact.last_name}, ${contact.first_name}</commonName>
                        <forename>${contact.first_name}</forename>
                        <surname>${contact.last_name}</surname>
                    </name>
                    <contactPoint>
                        <codedType code="BP" codingScheme="urn:ihe:iti:csd:2013:contactPoint">${contact.phone}</codedType>
                    </contactPoint>
                    </demographic>
                </provider>`
            cache = cache.concat(csd)
        }
        cache = cache.concat(`
            </providerDirectory>
        </CSD>`)

        let soap = `<soap:Envelope 
            xmlns:soap="http://www.w3.org/2003/05/soap-envelope" 
            xmlns:wsa="http://www.w3.org/2005/08/addressing" 
            xmlns:csd="urn:ihe:iti:csd:2013"> 
            <soap:Header>
            <wsa:Action soap:mustUnderstand="1" >urn:ihe:iti:csd:2013:GetDirectoryModificationsResponse</wsa:Action>
            <wsa:MessageID>urn:uuid:{random:uuid()}</wsa:MessageID>
            <wsa:To soap:mustUnderstand="1">http://www.w3.org/2005/08/addressing/anonymous</wsa:To> 
            </soap:Header>
            <soap:Body>
            <csd:getModificationsResponse>
                ${cache}
            </csd:getModificationsResponse>
            </soap:Body>
        </soap:Envelope>`
        res.type('application/soap+xml')
        res.status(200).send(soap)
    })
});

router.post('/add-provider', function (req, res) {
    if (!req.body.uuid)
        req.body.uuid = uuidv4()
    providerDB.insert([
        req.body.uuid,
        req.body.facility,
        req.body.last_name,
        req.body.first_name,
        req.body.phone,
        req.body.email
    ],
        function (err) {
            if (err) {
                console.log(err)
                return res.status(500).send(err)
            }
            console.log('Success.')
            res.status(200).send('Success!')
        });
});

router.post('/remove-provider', function (req, res) {
    providerDB.delete([req.body.uuid],
        function (err) {
            if (err) return res.status(500).send(err)
            res.status(200).send('Success!')
        });
});

app.use(router)

let port = process.env.PORT || 3000;

let server = app.listen(port, function () {
    console.log('Express server listening on port ' + port)
});