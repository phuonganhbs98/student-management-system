const { authJwt } = require('../middleware')
const controller = require('../controller/class-controller')

module.exports = function (app) {

    app.post("/api/classes",
    [authJwt.verifyToken, authJwt.isTeacher],
    controller.createClass);
    
}