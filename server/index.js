require('dotenv').config();
const express = require('express');
const cors = require('cors');
const massive = require('massive');
const app = express();
const ctrl = require('./controller');
const {SERVER, CONNECTION_STRING} = process.env

app.use(express.json());
app.use(cors());




massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
})
.then(db => {
    app.set('db', db)
    console.log(`db connected`)
})
.catch(err => console.log(err))


app.listen(SERVER, () => console.log(`server is running on ${SERVER}`))