import mongoose from 'mongoose';
import configs from './index';
const config = configs[process.env.NODE_ENV];

mongoose.connect(config.mongo.url);

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ');
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

export default mongoose;
