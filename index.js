const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL, {
   useNewUrlParser: true
}).then(() => {
      console.log('Database sucessfully connected')
   },
   error => {
      console.log('Database could not connected: ' + error)
   }
)

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to aws application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server aws is  on port ${PORT}.`);
});


// error not found
app.use((req, res, next) => {
  const err = new Error('not found');
  err.status = 404;
  next(err);
  
});

 // error handler
 app.use((err, req, res, next) => {
   const status = err.status || 500;
   res.status(status).json({ error: { message: err.message}});
 });