var express = require('express')
var bodyParser = require('body-parser')
var socket = require('socket.io')
var mongoose = require('mongoose')
var {Message} = require('./models/Message')
var app = express()
mongoose.Promise = Promise

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var urlCred = 'mongodb://user:user123@ds253104.mlab.com:53104/node_app'

mongoose.connect(urlCred,{useNewUrlParser: true}, (err) => {
    console.log('mongoose connected', err)
})
var server = app.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})

app.get('/messages', (req, res) => {
    Message.find({},(err, messages) => {
        res.send(messages)
    })
})

app.post('/messages', async (req, res) => {
    try{
        var message = new Message(req.body)
        await message.save()
        var censored = await Message.findOne({message: 'badword'})
        if(censored) {
            await Message.deleteOne({_id: censored.id})
        }else{
            io.emit('message', req.body)
        }
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
        return console.error(error)
    } finally {

    }
})



var io = socket(server)
io.on('connection', function(socket) {
    console.log('socket connected')
    
})