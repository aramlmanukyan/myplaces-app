export default (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        type: { //1 - regular user, 2 - social user
            type: DataTypes.INTEGER,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            isEmail: true,
            allowNull: false,
            unique: true
        },
        avatar: {
            type: DataTypes.STRING(250)
        },
        social_token: {
            type: DataTypes.STRING(250)
        },
        social_type: {
            type: DataTypes.STRING(50)
        },
        token: {
            type: DataTypes.STRING(250)
        }
    }, {
        tableName: 'user',
        timestamps: true,
        getterMethods: {}
    });

    User.associate = (db)=>{
        db.User.belongsTo(db.City);
    };

    return User;

};