const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection')
const cors = require('cors')

const routes = require('./routes.js')

const PORT = process.env.PORT || 9000

const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || ''
const DB_NAME = process.env.DB_NAME || 'library'
const DB_PORT = process.env.DB_PORT || 3306

const app = express()
app.set('port', process.env.PORT || 9000)
const dbOptions = {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
}

// middlewares ------------------------
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())
app.use(cors())

// routes ------------------------
app.get('/', (req, res) => {
    res.send('Welcome to my API')
})

app.use('/api', routes);

// server runing ---------------------
app.listen(app.get('port'), () => {
    console.log('Server running on port', app.get('port'))
})
