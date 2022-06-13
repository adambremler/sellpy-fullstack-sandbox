const router = require('express').Router()
const { TodoListController } = require('../controllers')

router.get('/', TodoListController.getTodoLists)

module.exports = router
