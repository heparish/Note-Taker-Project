// everysingle route has to read the file, alwasy hae to parse the data ocsn tin each route, alawsy have to parse the data before psoting or dealting
const fs = require("fs");

const path = require('path');
const uniqid = require('uniqid');

module.exports = (app) => {
    // API GET requests
    app.get('/api/notes', (req, res) => {
        fs.readFile((path.join(__dirname, '../db/db.json')), "utf8", (err,data) => {
            if (err) {
                throw err;
            }
            return res.json(JSON.parse(data));
        });
    });

    app.post('/api/notes', (req, res) => {
        const note = req.body;
        note.id = uniqid();
        const database = JSON.parse(fs.readFileSync("../db/db.json/"));
        database.push(note);
        fs.writeFileSync('../db/db.json', JSON.stringify(database));
        res.json ("your note has been saved")
    });

    app.delete('/api/notes/:id', (req, res) => {
        const deleId = req.params.id;
        const dataToDele = JSON.parse(fs.readFileSync("../db/db.json/"));
        let filtered = dataToDele.filter(function (el) {
            return el.id != deleId;
        });
        fs.writeFileSync('../db/db.json', JSON.stringify(filtered));
        res.json ("your note has been deleted")
    })
};