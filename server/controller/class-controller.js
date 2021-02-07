const db = require('../model')
const User = db.user
const Role = db.role
const Class = db.class

exports.createClass = (req, res) => {
    console.log(req.body)
    const teacher = User.findOne({
        where: {
            username: req.body.username
        }
    }).then(teacher => {
        Class.create({
            name: req.body.name,
            capacity: req.body.capacity,
            teacherId: teacher.id
        })
            .then(newClass => {
                console.log(teacher);
                console.log(req.body)
                newClass.setTeacher(teacher);

                res.send({ message: `Class ${newClass.name} was created successfully!` })
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            })
    })
}