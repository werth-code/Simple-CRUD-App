const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.set('view engine', 'ejs')
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

                            res.render('index.ejs', { quotes:results })

                         }).catch(error => console.error(error))
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