const router = require('express').Router();
const bodyParser = require('body-parser')


const {
    todoCreate,
    todoDelete,
    todoUpdate,
    todoGetAllActive,
    todoGetAllCompleted,
    todoGetAll
} = require('../controllers/todo')

router.use(bodyParser.json())

// create one todo_
router.post( '/', todoCreate)

//Get all
router.get('/', todoGetAll);

//Get one by id
// router.get('/:id', postGetOne);

//Put / update one by _id
router.put('/:id', todoUpdate)

//Delete one by _id
router.delete('/:id', todoDelete)


module.exports = router;

