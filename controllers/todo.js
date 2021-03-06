const Todo = require('../models/todo');
const mongoose = require("mongoose");

const validId = (id) => mongoose.Types.ObjectId.isValid(id)

module.exports.todoCreate = async (req, res) => {
    const {value, subTaskValue} = req.body;
    const todo = new Todo({value, subTasks: {value: subTaskValue}})
    try {
        await todo.save()
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
        console.log('todos', todos);
        if(todos.length === 0 ) {
            return res.send({success: false, error: 'no todos yet'})
        }
        return res.send(todos);
    }  catch (e) {
        return res.send({success: false, error: e})
    }
}


//Subtask

module.exports.todoAddSubTask = async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: {subTasks: [ {value: req.body.value}]}  },
            {new: true}
            )

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

module.exports.todoDeleteSubTask = async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: {subTasks:  {_id: req.params.subId}  }  },
            {new: true}
            )
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

module.exports.todoToggleSubTaskActive = async (req, res) => {
    try {

            const todo = await Todo.findById(req.params.id);
            todo.subTasks
                .filter(subtask => subtask._id.toString() === req.params.subId)
                .map(subtask => subtask.isCompleted = !subtask.isCompleted)
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