const express = require ("express"); 
const router = express.Router();
const path = require("path");


router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
})

// always goes last
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

module.exports = router