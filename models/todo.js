const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    value: {type: String, default: 'default_value'},
    timestamp: {
        type: Date,
        default: Date.now()
    },
    isCompleted: {type: Boolean, default: false}
})

module.exports = mongoose.model('Todo', todoSchema)