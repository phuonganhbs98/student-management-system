const jwt = require('jsonwebtoken');
const config = require('../config/auth-config')
const db = require ("../model")

const User = db.user

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    })
}

const isTeacher = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for(let i=0; i<roles.length; i++){
                if(roles[i].name==='teacher'){
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Teacher Role!"
            });
            return ;
        });
    })
}

const isOrganization = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for(let i=0; i< roles.length; i++){
                if(roles[i].name === "organization"){
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Organization Role!"
            })
        })
    })
}

const isTeacherOrOrganization= (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for(let i =0; i<roles.length; i++){
                if(roles[i].name === "teacher" || roles[i].name === "organization"){
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require organization or teacher role!"
            })
        })
    })
}

const authJwt = {
    verifyToken: verifyToken,
    isTeacher: isTeacher,
    isOrganization: isOrganization,
    isTeacherOrOrganization: isTeacherOrOrganization
}

module.exports = authJwt