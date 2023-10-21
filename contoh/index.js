const express = require('express');
const app = express();

const multer = require('multer');
const path = require('path');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'negara',
    password: 'sabdha04',
    port: 5432,
});

const profiles = [
    {
        name: 'Dani Munif',
        phone: '081234567890',
    },
    {
        name: 'Ari',
        phone: '086436718889',
    },
    {
        name: 'Budi',
        phone: '085236718889',
    },
];

app.use('/upload', express.static(path.join(__dirname, 'upload')));

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/upload')); // -> /upload
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + ' ' + Date.now() + path.extname(file.originalname)); // example -> file-1234567890.jpg
    }
});

app.put('/profile/upload', multer({ storage: diskStorage }).single('photo'), (req, res) => {
    const file = req.file.path;
    console.log(file);
    if (!file) {
        res.status(400).send({
            status: false,
            data: 'No file is selected.'
        });
    }
    profiles[req.query.index].photo = req.file.path;
    res.send(file);
});





const upload = multer({ storage: diskStorage });

// create a put route to upload photo to database
app.put('/world/upload/:id', upload.single('photo'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({
            status: false,
            data: 'No file is selected.',
        });
    }

    const photoPath = file.path; // Path to the uploaded photo

    // Assuming you have a 'country' table in your database
    const insertQuery = 'UPDATE country SET photo = $1 WHERE id = $2 RETURNING *';

    pool.query(insertQuery, [photoPath, req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                status: false,
                error: 'An error occurred while processing your request.',
            });
        }

        const savedCountry = result.rows[0];
        res.json({
            status: true,
            data: savedCountry,
        });
    });
});

// serve the image by its path
app.get('/world/photo/:id', (req, res) => {
    const id = req.params.id;
    const selectQuery = 'SELECT photo FROM country WHERE id = $1';

    pool.query(selectQuery, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                status: false,
                error: 'An error occurred while processing your request.',
            });
        }

        const country = result.rows[0];
        res.sendFile(country.photo);
    });
});

app.listen(3000, function () {
    console.log('server running');
});