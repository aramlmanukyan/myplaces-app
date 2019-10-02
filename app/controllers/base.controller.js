import multer from "multer";

class BaseController {
    filterParams(params, whitelist) {
        const filtered = {};
        for (const key in params) {
            if (whitelist.indexOf(key) > -1) {
                filtered[key] = params[key];
            }
        }
        return filtered;
    }

    logForTest(data){
        if(process.env.NODE_ENV == 'dev')
            console.log(data);
    }

    respFormat(result){
        return {
            result
        }
    }

    storage(dir, time){
        return multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, dir);
            },
            filename: (req, file, callback)=> {
                callback(null, time + '-' + file.originalname );
            }
        });
    }
}

export default BaseController;