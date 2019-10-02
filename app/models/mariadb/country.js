export default (sequelize, DataTypes) => {
    const Country = sequelize.define('Country', {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        code: {
            type: DataTypes.STRING(2),
            allowNull: false
        },
    }, {
        tableName: 'country',
        timestamps: false,
        getterMethods: {}
    });

    Country.associate = (db)=>{
        db.Country.hasMany(db.State);
    };

    return Country;
};