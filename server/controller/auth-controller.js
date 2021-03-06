const db = require('../model')
const config = require('../config/auth-config')
const User = db.user
const Role = db.role

const Op = db.Sequelize.Op

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
const role = require('../model/role')

exports.signup = (req, res) => {
    console.log(req.body)
    // res.json({message: "Heeeeeeeeeeee!"})
    User.create({
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    })
        .then(user => {
            if (req.body.role) {
                let roles = [...req.body.role];
                user.setRoles(roles).then(() => {
                    res.send({ message: "User was registered successfully!" })
                })
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
}

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (!user) {
            res.status(400).send({
                message: "User not found!"
            });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid password"
            })
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400
        })

        var authorities = [];
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }

            res.status(200).send({
                id: user.id,
                fullname: user.fullname,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            })
        })
    })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}