const express = require('express');
const router = express.Router();
const contacts = require('../models/modelContacts.js');
const controller = require('../controllers/controllerContacs.js');

router.get('/contact', function (req, res) {
    res.send(contacts);
});

router.post('/contact', controller.uploadContactPhoto, (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send({
            success: false,
            data: 'tidak ada file yang dipilih.'
        });
    }
    contacts.push({ name: req.body.name, phone: req.body.phone,umur:req.body.umur, photo: file.path });
    res.send({ success: true });
});

router.put('/contact', controller.uploadContactPhoto, (req, res) => {
    const index = req.query.index;
    if (index !== undefined && index >= 0 && index < contacts.length) {
        const updatedContact = {
            name: req.body.name,
            phone: req.body.phone,
            umur: req.body.umur,
            photo: req.file ? req.file.path : contacts[index].photo,
        };
        contacts[index] = updatedContact;
        res.send({ success: true });
    } else {
        res.send({ success: false, data: 'Invalid index.' });
    }
});

router.delete('/contact',function(req,res){
    contacts.splice(req.query.index,1);
    res.send({success: true});
});

module.exports = router;
