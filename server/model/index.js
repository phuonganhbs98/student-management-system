const config = require('../config/db-config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../model/user')(sequelize, Sequelize)
db.role = require('../model/role')(sequelize, Sequelize)
db.class = require('../model/class')(sequelize, Sequelize)


db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

// 1 lop do 1 teacher tao ra - 1 teacher tao ra duoc nhieu lop
db.class.belongsTo(db.user, {as: 'teacher', foreignKey: 'teacherId'}) // Tao ra collums 'teacherId' foreign key in Class
db.user.hasMany(db.class, {foreignKey: 'teacherId'})

//1 học sinh thuộc về nhiều lớp, và 1 lớp có nhiều học sinh 
db.user.belongsToMany(db.class, {
    through: 'student_classes',
    foreignKey: 'studentId',
    otherKey: 'classId'
});

db.class.belongsToMany(db.user, {
    through: 'student_classes',
    foreignKey: 'classId',
    otherKey: 'studentId'
});


db.ROLES = ["student", "teacher", "organization"];

module.exports = db;