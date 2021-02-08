const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
const MongoClient = require('mongodb').MongoClient

let connectionString = 'mongodb+srv://matt:rhinos91@cluster0.hbmkm.mongodb.net/crud-app?retryWrites=true&w=majority'

MongoClient.connect(connectionString, {useUnifiedTopology: true}, (err, client) => {
    if (err) return console.error(err)
    console.log("Something happened MONGO...")
})

app.get("/", (req, res) => { 
    res.sendFile('/Users/m21/dev/VS Code/Express/SimpleCRUDApp/index.html')
})

app.post('/quotes', (req, res) => {
console.log(req.body)
})

app.listen(3100,function(){  console.log('listening on 3100')})