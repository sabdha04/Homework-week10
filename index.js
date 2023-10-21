const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const upload = require('./routes/movies.js');
const contact = require('./routes/contacts.js');

app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use(bodyParser.json());
app.use(express.json());
app.use(upload);
app.use(contact);

app.listen(3000, function () {
    console.log('Server running');
});
