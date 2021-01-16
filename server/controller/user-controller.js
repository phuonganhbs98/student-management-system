const db = require('../model')
const User = db.user
const Role = db.role

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content")
}

exports.studentBoard = (req, res) => {
    User.findAll({
        include: {
            model: Role,
            where: {
                name: 'student'
            }
        }
    }).then(users => {
        if (!users) {
            res.status(400).send({
                message: "User not found!"
            });
        } else {
            console.log("TAT CA USER CO ROLE LA STUDENT: ....")
            console.log(users);
            res.status(200).send({
                users
            });
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send({
            err
        })
    })

}

exports.organizationBoard = (req, res) => {
    res.status(200).send("Organization Content")
}

exports.teacherBoard = (req, res) => {
    User.findAll({
        include: {
            model: Role,
            where: {
                name: 'teacher'
            }
        }
    }).then(users => {
        if (!users) {
            res.status(400).send({
                message: "User not found!"
            });
        } else {
            console.log("TAT CA USER CO ROLE LA TEACHER: ....")
            console.log(users);
            res.status(200).send({
                users
            });
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send({
            err
        })
    })
}