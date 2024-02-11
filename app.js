const express = require("express");
const path = require("path");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
const PORT = 3000;
const app = express();
app.set('views', 'public');
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use("/", routes);

app.listen(PORT, function(){
    console.log("Server running on port: " + PORT);
});
