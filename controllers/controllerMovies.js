const multer = require('multer');
const path = require('path');
const model = require('../models/modelMovies.js');

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

const uploadMoviePhoto = upload.single('photo');

const serveMoviePhoto = (req, res) => {
    const id = req.params.id;

    model.getMoviePhotoPath(id, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                status: false,
                error: 'Ada yang salah mungkin!! coba cek kembali.',
            });
        }

        const movie = result.rows[0];

        if (movie.photo) {
            const absolutePath = path.join(__dirname, '..', movie.photo);
            res.sendFile(absolutePath);
        } else {
            res.status(404).json({
                status: false,
                error: 'Photo not found'
            });
        }
    });
};

module.exports = {
    uploadMoviePhoto,
    serveMoviePhoto,
};
