import md5 from 'md5';
import mongoose from '../../config/mongoose';
const Schema = mongoose.Schema;

let schema = new Schema({
    email : {
        type: String,
        unique: true,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    surname : {
        type: String,
        required: true
    },
    hashedPassword : {
        type: String,
        required: true
    },
    created : {
        type: Date,
        default: Date.now()
    }
});


schema.methods.encryptPassword = function(password){
    return md5(password);
};

schema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) == this.hashedPassword;
};

schema.virtual('password')
    .set(function(password){
        this.hashedPassword = this.encryptPassword(password);
    });

export default mongoose.model('Users', schema);