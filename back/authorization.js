const jwt = require('jsonwebtoken');
const config = require('./config');



const validarUsuario = (req, res, next) => {

    const token_decoded = req.headers.authorization.split(' ')[1]
    const decodificado = jwt.verify(token_decoded, config.jwtClave);
    req.mail = decodificado
   
    if (!req.mail) {
        res.status(403).json({ error: "no estas autorizado" });
    } else {
        console.log("llega")
        next();
    }
}

const esAdmin = (req, res, next) => {
    if (req.mail.perfil === "admin") {
        next();
    } else {
        res.status(403).json({ error: "no estas autorizado" });
        return;
    }

}

module.exports = { validarUsuario, esAdmin };