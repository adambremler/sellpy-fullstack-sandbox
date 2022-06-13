const { TodoListModel } = require('../models')

const seedDBIfEmpty = async () => {
  const todoLists = await TodoListModel.find()
  if (todoLists.length === 0) {
    await TodoListModel.insertMany([
      {
        title: 'First List',
        todos: [
          {
            title: 'First todo of first list!',
          },
        ],
      },
      {
        title: 'Second List',
        todos: [
          {
            title: 'First todo of second list!',
          },
        ],
      },
    ])

    console.log('Seeded DB with 2 todo lists.')
  }
}

module.exports = seedDBIfEmpty
