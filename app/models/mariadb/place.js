export default (sequelize, DataTypes) => {

    const Place = sequelize.define('Place', {
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        info: {
            type: DataTypes.TEXT
        },
        lat: {
            type: DataTypes.STRING(250)
        },
        lon: {
            type: DataTypes.STRING(50)
        }
    }, {
        tableName: 'place',
        timestamps: true,
        getterMethods: {} //todo remove password
    });

    Place.associate = (db)=>{
        db.Place.belongsTo(db.Place);
        db.Place.hasMany(db.PlaceGallery);
    };

    return Place;

};