const Todo = require('../models/todo');
const mongoose = require("mongoose");

const validId = (id) => mongoose.Types.ObjectId.isValid(id)

module.exports.todoCreate = async (req, res) => {
    console.log(req)
    const {value} = req.body;
    const todo = new Todo({value})
    try {
        await todo.save().then(_ => console.log(req.body))
    } catch (e) {
        return res.send({success: false, error: e})
    }
    return res.send(todo)
}

module.exports.todoDelete = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({_id: req.params.id})
        if(todo === null) {
            return res.send({success: false, error: 'there is no such id'})
        }
        return res.send(todo)
    } catch (e) {
        if(!validId(req.params.id)) {
            return res.send({success: false, error: 'invalid id'})
        }
        return res.send({success: false, error: e})
    }
}

module.exports.todoEdit = async (req, res) => {
    try {
        const todo = await Todo.findOneAndReplace(
            { _id: req.params.id },
            { value: req.body.value })

        if(todo === null) {
            return res.send({success: false, error: 'there is no such id'})
        }
        return res.send(todo)
    } catch (e) {
        if(!validId(req.params.id)) {
            return res.send({success: false, error: 'invalid id'})
        }
        return res.send({success: false, error: e})
    }
}

module.exports.todoToggleActive = async (req, res) => {
    try {

        const todo = await Todo.findById(req.params.id);
        todo.isCompleted = !todo.isCompleted;
        todo.save()

        if(todo === null) {
            return res.send({success: false, error: 'there is no such id'})
        }
        return res.send(todo)
    } catch (e) {
        if(!validId(req.params.id)) {
            return res.send({success: false, error: 'invalid id'})
        }
        return res.send({success: false, error: e})
    }
}


module.exports.todoGetAll = async (req, res) => {
    try {
        const todos = await Todo.find();
        if(todos.length === 0 ) {
            return res.send({success: false, error: 'no todos yet'})
        }
        return res.send(todos);
    }  catch (e) {
        return res.send({success: false, error: e})
    }
}
