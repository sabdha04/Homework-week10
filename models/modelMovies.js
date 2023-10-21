const pool = require('../queries.js')

const updateMoviePhoto = (id, photoPath, callback) => {
    const insertQuery = 'UPDATE movies SET photo = $1 WHERE id = $2 RETURNING *';

    pool.query(insertQuery, [photoPath, id], callback);
};

const getMoviePhotoPath = (id, callback) => {
    const selectQuery = 'SELECT photo FROM movies WHERE id = $1';

    pool.query(selectQuery, [id], callback);
};

module.exports = {
    updateMoviePhoto,
    getMoviePhotoPath,
};
