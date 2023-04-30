const express = require("express");
const app = express();
const config = require("config");
const route = require("./src/routes/route.js")
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use('/public', express.static('public'));

require("./startup/db")();
require("./startup/error_hendler")();

app.use("", route)



app.listen(config.port, ()=> console.log(`listening to port ${config.port}`))