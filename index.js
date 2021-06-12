const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')
const hbs = require('hbs')
const Bin = require('./schemas/BinSchema')

require('./db.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/', (req, res)=>{
    return res.render('home', {text:''})
})

app.get('/:id', async (req, res)=>{
    if (!req.params.id) return res.redirect('/')
    const bin = await Bin.findById(req.params.id).catch((e)=>console.log(e))
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