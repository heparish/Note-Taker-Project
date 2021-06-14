// everysingle route has to read the file, alwasy hae to parse the data ocsn tin each route, alawsy have to parse the data before psoting or dealting
const fs = require("fs");

const path = require('path');
const uniqid = require('uniqid');

const dbPath = path.join(__dirname, '../db/db.json');


module.exports = (app) => {
    // => API GET requests
    app.get('/api/notes', (req, res) => {
        fs.readFile(dbPath, "utf8", (err,data) => {
            if (err) {
                throw err;
            }
            return res.json(JSON.parse(data));
        });
    });

    //api POST requests
    app.post('/api/notes', (req, res) => {
        const note = req.body;
        note.id = uniqid();
        const database = JSON.parse(fs.readFileSync(dbPath));
        database.push(note);
        fs.writeFileSync(dbPath, JSON.stringify(database));
        res.json ("your note has been saved")
    });

    app.delete('/api/notes/:id', (req, res) => {
        const deleId = req.params.id;
        const dataToDele = JSON.parse(fs.readFileSync(dbPath));
        let filtered = dataToDele.filter(function (el) {
            return el.id != deleId;
        });
        fs.writeFileSync(dbPath, JSON.stringify(filtered));
        res.json ("your note has been deleted")
    })

}