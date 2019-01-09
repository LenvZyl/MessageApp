var mongoose = require('mongoose')

var Message = mongoose.model('Message', {
    name: {
        type: String,
        require: true,
        minlength: 1,
        trim: true
    },
    message: {
        type: String,
        require: true,
        minlength: 1,
        trim: true
    }
    
})

module.exports = {
    Message
}