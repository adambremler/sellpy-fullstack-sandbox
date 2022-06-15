const { TodoListModel } = require('../models')
const { internalServerError } = require('../utils/responses.utils')

class TodoController {
  static async getTodos(req, res) {
    try {
      const todos = (await TodoListModel.findOne({ _id: req.params.todoListID })).todos

      res.status(200).json(todos)
    } catch (error) {
      internalServerError(req, res, error)
    }
  }

  static async createTodo(req, res) {
    try {
      const todo = (
        await TodoListModel.findOneAndUpdate(
          { _id: req.params.todoListID },
          {
            $push: {
              todos: {
                title: req.body.title,
              },
            },
          },
          {
            new: true,
          }
        ).select({ todos: { $slice: -1 } })
      ).todos[0]

      res.status(201).json(todo)
    } catch (error) {
      internalServerError(req, res, error)
    }
  }

  static async updateTodo(req, res) {
    try {
      await TodoListModel.findOneAndUpdate(
        { _id: req.params.todoListID, 'todos._id': req.params.todoID },
        { $set: { 'todos.$.title': req.body.title } }
      )

      res.status(204).send()
    } catch (error) {
      internalServerError(req, res, error)
    }
  }

  static async deleteTodo(req, res) {
    try {
      await TodoListModel.findOneAndUpdate(
        { _id: req.params.todoListID },
        { $pull: { todos: { _id: req.params.todoID } } }
      )

      res.status(204).send()
    } catch (error) {
      internalServerError(req, res, error)
    }
  }
}

module.exports = TodoController
