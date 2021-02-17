//Vínculos
const sequelize = require('./conexion.js');
require('dotenv').config()
const { validarUsuario, esAdmin } = require('./authorization.js');
const config = require('./config')

//npm install express
var express = require('express');
var app = express();
app.use(express.static('publica'));
app.use(express.json())

//npm install ejs
const expressLayouts = require('express-ejs-layouts')

//npm install body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Cors
const cors = require('cors');
app.use(cors());

//Helmet
const helmet = require('helmet')
app.use(helmet())
//const rateLimit = require("express-rate-limit");

//npm install jsonwebtoken
var jwt = require('jsonwebtoken');

//npm install express-jwt
var expressJwt = require('express-jwt');

//Protegemos todo menos el /login
app.use(expressJwt({ secret: process.env.jwtClave, algorithms: ['HS256'] }).unless({ path: ["/login", "/registro"] }));


//-------------------------------------Usuarios-----------------------------------//

//Endpoints//
app.post('/login', login) //Login usuario existente


//Queries usuarios
 function login(req, res) {
    var data = req.body;
     sequelize.query('SELECT * FROM usuarios WHERE mail=? AND pass=?',
        { replacements: [data.mail, data.pass], type: sequelize.QueryTypes.SELECT })
        .then(function (resultado) {
            
            if (data.mail == resultado[0].mail || data.pass == resultado[0].pass) {
                
                var token = jwt.sign({
                    mail: data.mail,
                    perfil: resultado[0].perfil,
                }, process.env.jwtClave);

                //console.log(token)
                res.status(200).send(token)
                return
            }
        }).catch(function () {
            res.status(401).send("Mail y/o pass son incorrectos o vacios")
        })
}



//------------------------------Conexión al servidor---------------------------//
app.listen(3000, function () {
    console.log('El servidor express corre en el puerto 3000');
});