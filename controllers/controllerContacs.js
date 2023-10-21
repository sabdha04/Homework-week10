const contacts = require('../models/modelContacts.js');
const multer = require('multer');
const path = require('path');

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../upload'));
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload = multer({ storage: diskStorage });

const uploadContactPhoto = upload.single('photo');


const validateIndex = (req,res,next) =>{
    if(
        req.query.index !== undefined &&
        contacts[req.query.index] === undefined
    ){
        res.send({succes: false});
    }else{
        next();
    }
}

module.exports = {
    validateIndex,
    uploadContactPhoto,
};