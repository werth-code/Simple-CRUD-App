const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
const MongoClient = require('mongodb').MongoClient

let connectionString = 'mongodb+srv://matt:rhinos91@cluster0.hbmkm.mongodb.net/crud-app?retryWrites=true&w=majority'

MongoClient.connect(connectionString, {useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('crud-app')
        const quotesCollection = db.collection('quotes')

    app.get("/", (req, res) => { 
        const cursor = db.collection('quotes')
                         .find()
                         .toArray()
                         .then(results => {

                            console.log(results) // These are our database items...

                         }).catch(error => console.error(error))
/
        res.sendFile('/Users/m21/dev/VS Code/Express/SimpleCRUDApp/index.html')
    })

    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
        .then(result => {
            console.log(req.body)
            res.redirect('/')
    }).catch(error => console.error(error))})

}).catch(console.error)



app.listen(3100, function(){  
    console.log('listening on 3100')
})