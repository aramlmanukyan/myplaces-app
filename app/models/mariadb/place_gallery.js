export default (sequelize, DataTypes) => {
    const PlaceGallery = sequelize.define('PlaceGallery', {
        source: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
    }, {
        tableName: 'place_gallery',
        timestamps: true,
        getterMethods: {}
    });

    PlaceGallery.associate = (db)=>{
        db.PlaceGallery.belongsTo(db.Place);
    };

    return PlaceGallery;

};