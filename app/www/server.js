import app from '../app';
import http  from 'http';
import cluster from 'cluster';
const numCPUs = require('os').cpus().length;
import configs from '../config/index'
const config  = configs[process.env.NODE_ENV];

// if (cluster.isMaster) {
//     // console.log('this is the master process: ', process.pid);
//     // require('../db_scripts/fill_cities'); // run when tables is created // Todo reformat
//     for (let i=0; i<numCPUs; i++) {
//         cluster.fork()
//     }
// } else {
//     // console.log('this is the cluster process: ', process.pid);
//
    const server = http.createServer(app);

    server.listen(config.port, config.ip_address);
    server.on('error', onError);
    server.on('listening', onListening);

// }

function onListening() {
    const addr = server.address();
    const process_id = process.pid;
    console.log(`Listening on ${addr}, Process id is - ${process_id},  Env - ${process.env.NODE_ENV}`);
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    switch (error.code) {
        case 'EACCES':
            console.error(config.port + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(config.port + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

export default app;

