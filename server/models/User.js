module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User",  {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4

        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
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
        role: {
            type: DataTypes.ENUM("participant", "host"),
            allowNull: false,
            defaultValue: "participant"
        },
        belt: {
            type: DataTypes.ENUM("White", "Blue", "Purple", "Brown", "Black", "Unranked"),
            allowNull: false,
        },
        affiliation: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Nomad"
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