const { TodoModel } = require('../models')
const { internalServerError } = require('../utils/responses.utils')

class TodoController {
  static async getTodos(req, res) {
    try {
      const todos = await TodoModel.find({ todoList: req.params.todoListID })

      res.status(200).json(todos)
    } catch (error) {
      internalServerError(req, res, error)
    }
  }

  static async createTodo(req, res) {
    try {
      const todo = await TodoModel.create({
        todoList: req.params.todoListID,
        title: req.body.title,
      })

      res.status(201).json(todo)
    } catch (error) {
      internalServerError(req, res, error)
    }
  }

  static async updateTodo(req, res) {
    try {
      await TodoModel.findOneAndUpdate({ _id: req.params.todoID }, { title: req.body.title })

      res.status(204).send()
    } catch (error) {
      internalServerError(req, res, error)
    }
  }

  static async deleteTodo(req, res) {
    try {
      await TodoModel.findOneAndDelete({ _id: req.params.todoID })

      res.status(204).send()
    } catch (error) {
      internalServerError(req, res, error)
    }
  }
}

module.exports = TodoController
