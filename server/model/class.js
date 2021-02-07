module.exports = (sequelize, Sequelize) => {
    const Class = sequelize.define("classes", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        capacity: {
            type: Sequelize.INTEGER
        }
    });

    return Class;
}