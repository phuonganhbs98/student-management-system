const { authJwt } = require('../middleware')
const controller = require('../controller/user-controller')

module.exports = function(app) {
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get(
        "/api/test/student",
        [authJwt.verifyToken],
        controller.studentBoard
    )

    app.get(
        "/api/test/organization",
        [authJwt.verifyToken, authJwt.isOrganization],
        controller.organizationBoard
    )

    app.get(
        "/api/test/teacher",
        [authJwt.verifyToken, authJwt.isTeacher],
        controller.teacherBoard
    )
}