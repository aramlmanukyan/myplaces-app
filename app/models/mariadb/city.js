export default (sequelize, DataTypes) => {  //TODO dzevapoxel
    const City = sequelize.define('City', {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'city',
        timestamps: false,
        getterMethods: {}
    });

    City.associate = (db)=>{
        db.City.belongsTo(db.State);
        db.City.hasMany(db.User);
    };

    return City;
};