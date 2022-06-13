const mongoose = require('mongoose')

const TodoListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  todos: [
    {
      title: {
        type: String,
        required: true,
      },
    },
  ],
})

const TodoListModel = mongoose.model('todoLists', TodoListSchema)

module.exports = TodoListModel
