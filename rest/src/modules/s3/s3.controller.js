const s3Helper = require('./s3.helper');
//const memcached = require('../../utils/cache');
const APIError = require('../../utils/error');



async function getPresignedUrl(req, res, next) {
    try {


        // function cb(err, data) {
        //     data = data
        //     if (err)
        //         console.log(err)
        //     else
        //         console.log(data)
        // }


        // memcached.get(key, function (err, data) {
        //     if (err)
        //         console.log(err)
        //     else {
        //         console.log("from cache", data);
        //         res.json(data)
        //     }
        // });

        const key = req.params.key;
        if (!key)
            throw new Error("No parameters sent.");
        const url = await s3Helper.getS3signedUrl(key);

        // memcached.set(key, url, 3600, function (err, data) {
        //     if (err) {
        //         console.log(err);
        //         //throw new Error(err);
        //     }
        //     console.log(data)
        // })
        res.json({ url: url });
    }
    catch (err) {
        next(err);
    }
}

async function putPresignedUrl(req, res, next) {
    try {
        const key = req.params.key;
        const url = await s3Helper.putS3signedUrl(key);
        res.json({ url: url });
    }
    catch (err) {
        next(err);
    }
}

async function postPresignedUrl(req, res, next) {
    try {
        const fileData = {
            name: req.body.name,
            extention: req.body.type
        };
        console.log(fileData);
        const { url, fields } = await s3Helper.postS3signedUrl(fileData);
        res.json({ url: url, fields: fields });
    }
    catch (err) {
        next(err);
    }

}


async function deleteS3Object(req, res, next) {
    try {
        const key = req.body.key;
        console.log(key)
        if (!key)
            throw new Error("No parameters sent.");
        const data = s3Helper.deleteObject(key);
        console.log(data)
        res.json({
            status: "success",
            message : data
        })
    }
    catch (e) {
        next(e);
    }
}

module.exports = {
    getPresignedUrl, postPresignedUrl, putPresignedUrl, deleteS3Object
}


