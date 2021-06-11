const mongoose = require('mongoose')
const dburl = "mongodb+srv://admin:admin@cluster0.rf8b4.mongodb.net/myHatebin?retryWrites=true&w=majority"
class Database{
    constructor(){
        this.connect()
    }
    connect() {
        mongoose.connect(dburl, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useFindAndModify: false
        }).then(()=>{
            console.log('Connection to database successful')
        })
        .catch((e)=>{
            console.log(e)
        })
    }
}

module.exports = new Database()