const express = require ("express");

const PORT = process.env.PORT||3000;

const app = express();

// const htmlRoutes = require ("./routes/htmlRoutes")

// allows info to go to app and vice versa
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// app.use(htmlRoutes)

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!"+ " ...Click on the link: " +"http://localhost:3000/");
  });