module.exports = (sequelize, DataTypes) => {
    const Listing = sequelize.define("Listing", {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        coordinates: {
            type: DataTypes.GEOMETRY('POINT'),
            allowNull: false
        },
        address: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        images: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        scheduleType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        scheduleList: {
            type: DataTypes.JSON,
            allowNull: true
        }

    })

    Listing.associate = (models) => {
        Listing.belongsTo(models.User, {
            foreignKey: "userId",
            onDelete: "CASCADE"
        })
    }

    return Listing
}