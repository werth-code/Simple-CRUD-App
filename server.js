const express =require('express')
const app = express()

app.get("/", (req, res) => { 
    res.send("HIYA !!!! There!")
})

app.listen(3100,function(){  console.log('listening on 3000')})