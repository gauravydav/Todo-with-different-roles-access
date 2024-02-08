const Todo = require('../models/todo');

const handleServerError = (res, error, customMessage = 'Internal Server Error') => {
  console.error(error);
  res.status(500).json({ message: customMessage });
};

const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = await Todo.create({ title, description });

    res.json({ message: 'Todo created successfully', todo: newTodo });
  } catch (error) {
    handleServerError(res, error);
  }
};

const editTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const { title, description } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { title, description },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo edited successfully', todo: updatedTodo });
  } catch (error) {
    handleServerError(res, error);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully', todo: deletedTodo });
  } catch (error) {
    handleServerError(res, error);
  }
};

const viewTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
  
    res.json({ message: 'Viewing todo list', todos });
  } catch (error) {
    handleServerError(res, error, 'Error fetching todos');
  }
};

module.exports = { createTodo, editTodo, deleteTodo, viewTodo };
