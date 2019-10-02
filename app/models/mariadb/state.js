export default (sequelize, DataTypes) => {
    const State = sequelize.define('State', {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'state',
        timestamps: false,
        getterMethods: {}
    });

    State.associate = (db)=>{
        db.State.belongsTo(db.Country);
        db.State.hasMany(db.City);
    };

    return State;
};