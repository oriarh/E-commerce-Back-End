require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const mysql = require('./config/connection');
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
mysql.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT} !`);
  })
  })
