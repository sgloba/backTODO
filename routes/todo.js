const router = require('express').Router();
const bodyParser = require('body-parser')


const {
    todoCreate,
    todoDelete,
    todoEdit,
    todoGetAll,
    todoToggleActive,
    todoDeleteSubTask,
    todoAddSubTask,
    todoToggleSubTaskActive
} = require('../controllers/todo');

router.use(bodyParser.json());

// create one todo_
router.post( '/', todoCreate);

//Get all
router.get('/', todoGetAll);

//Put
router.put('/:id', todoEdit);
router.put('/:id/toggle', todoToggleActive);
router.put('/:id/subtask/add', todoAddSubTask);
router.put('/:id/subtask/:subId/toggle', todoToggleSubTaskActive);

//Delete one by _id
router.delete('/:id', todoDelete);
router.delete('/:id/subtask/:subId/delete', todoDeleteSubTask);


module.exports = router;

