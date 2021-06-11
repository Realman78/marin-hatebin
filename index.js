const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')
const hbs = require('hbs')
const Bin = require('./schemas/binSchema')

require('./db.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', function(req, res){
    res.render('home', {text:''})
})

app.get('/:id', async function(req, res){
    const bin = await Bin.findById(req.params.id).catch((e)=>console.log('error'))
    if (!bin) {
        res.redirect('/')
        return
    }

    res.render('home', {text:bin.content})
})
app.post('/save', async (req,res)=>{
    if (!req.body.text) res.sendStatus(401)
    const text = req.body.text
    const binData = {
        content: text
    }
    let bin = await Bin.create(binData).catch((e)=>console.log(e))

    res.send(bin)
})
app.put('/update', async (req,res)=>{
    if (!req.body.text) res.sendStatus(401)
    const text = req.body.text
    const binData = {
        content: text
    }
    let bin = await Bin.findByIdAndUpdate(req.body.id, binData).catch((e)=>console.log(e))

    res.send(bin)
})

app.listen(PORT, ()=>{
    console.log(`Server is up and running on port ${PORT}`)
})