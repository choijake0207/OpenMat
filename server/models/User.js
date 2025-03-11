module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User",  {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        belt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        affiliation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true
        },
        location: {
           type: DataTypes.STRING,
           allowNull: false, 
        },
        pfp: {
            type: DataTypes.STRING(500),
            allowNull: true,
            validate: {
                isURL: true
            }
        }
    })

    return User
}