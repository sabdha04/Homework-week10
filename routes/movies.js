const express = require('express');
const controller = require('../controllers/controllerMovies.js');
const model = require('../models/modelMovies.js');
const router = express.Router();

router.put('/movies/upload/:id',controller.uploadMoviePhoto,(req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({
            status: false,
            data: 'tidak ada file yang dipilih.',
        });
    }
    const photoPath = file.path;
    model.updateMoviePhoto(req.params.id, photoPath, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                status: false,
                error: 'Ada yang salah mungkin!! coba cek kembali.',
            });
        }
        const savedMovie = result.rows[0];
        console.log('API Response:', JSON.stringify({
            status: true,
            data: savedMovie
        }, null, 2));
        res.json({
            status: true,
            data: savedMovie,
        });
    });
});

router.get('/movies/photo/:id', controller.serveMoviePhoto);

module.exports = router;
