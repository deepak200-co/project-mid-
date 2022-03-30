const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt');
const path = require("path");
const bodyParser = require('body-parser');
const db = require('./database');
const popup = require('node-popup');



const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));


app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'));
});


app.post('/register', async (req, res) => {
    inputData = {
        Firstname: req.body.firstname,
        Lastname: req.body.lastname,
        Username: req.body.username,
        email: req.body.email,
        gender: req.body.gender,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
        Phoneno: req.body.phoneno,
        Bio: req.body.bio
    }
    
    var sql = 'SELECT * FROM users WHERE email =username';
    db.query(sql, [req.body.username], function (err, data, fields) {
        if (err) {
            console.log(err);
            return;
        }

        if (data.length > 1) {
            var msg = inputData.emailaddress + "was already exist";
        } else if (inputData.confirmpassword != inputData.password) {
            popup.alert({
                content: 'Password & Confirm Password is not Matched'
            });

        } else {
            var sql = 'INSERT INTO users VALUES (?,?,?,?,?,?,?,?)';
            db.query(sql, [req.body.firstname,req.body.lastname,req.body.username,req.body.email,req.body.gender,req.body.password,req.body.phoneno,req.body.bio], function (err, data) {
                if (err) {
                    console.log(err);
                    return;
                }
            });
            var msg = "Your are successfully registered";
        }
        res.redirect('../login.html') 
        //  res.sendFile('registration.html', { root: __dirname } , { alertMsg: msg });
    })

});



app.post('/login', async (req, res) => {
    var Username = req.body.username;
    var password = req.body.password;
    var sql=' SELECT EXISTS(SELECT * FROM users WHERE Username = ? AND password =?)';
    db.query(sql, [Username, password], function (err, data, fields) {
        if(err) {
            console.log(err);
            return;
        }
        else if((sql)!=0){
            res.redirect('../user.html');
        } else{
            res.redirect('../login.html');
        }
    })
});


server.listen(5003, function(){
    console.log("server is listening on port: 5003");
});