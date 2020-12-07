
const router = require('express').Router();
const bodyParser = require('body-parser')


const {
    todoCreate,
    todoDelete,
    todoEdit,
    todoGetAll,
    todoToggleActive
} = require('../controllers/todo');

router.use(bodyParser.json());

// create one todo_
router.post( '/', todoCreate);

//Get all
router.get('/', todoGetAll);


//Put
router.put('/:id', todoEdit);
router.put('/:id/toggle', todoToggleActive);

//Delete one by _id
router.delete('/:id', todoDelete);


module.exports = router;

