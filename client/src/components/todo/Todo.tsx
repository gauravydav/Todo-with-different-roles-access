import React, { useEffect, useState } from "react";
import axios from "axios";
import CAN, { useAbilityEffect } from "../casl/can";
import { FaEdit, FaTrash } from "react-icons/fa";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";

interface Todo {
  _id: string;
  title: string;
  description: string;
}

const TodoList: React.FC = () => {
  const token = localStorage.getItem("token");

  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const fetchTodos = async () => {
    try {
      const response = await axios.get<{ todos: Todo[] }>(
        "http://localhost:5000/todo/view-todo",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTodos(response.data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    }
  }, [isAuthenticated, token]);
  const handleDelete = async (todoId: string) => {
    try {
      await axios.delete(`http://localhost:5000/todo/delete-todo/${todoId}`, {
        headers: {
          Authorization: token,
        },
      });
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      if (!editingTodo || !editingTodo.title || !editingTodo.description) {
        console.error("Title and description are required for update");
        return;
      }

      await axios.put(
        `http://localhost:5000/todo/edit-todo/${editingTodo._id}`,
        editingTodo,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchTodos();
      setShowModal(false);
      setEditingTodo(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };
  const handleCreate = async () => {
    try {
      if (!newTodo.title || !newTodo.description) {
        console.error("Title and description are required");
        return;
      }

      await axios.post("http://localhost:5000/todo/create-todo", newTodo, {
        headers: {
          Authorization: token,
        },
      });

      fetchTodos();
      setShowModal(false);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  useAbilityEffect();

  return (
    <div className="p-4">
      <Header />
      <div className="flex justify-between items-center mb-4 mt-20">
        <h1 className="text-2xl font-bold"></h1>
        {CAN("create", "Todo") && (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={() => setShowModal(true)}
          >
            Create
          </button>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-25"></div>
          <div className="relative bg-white p-8 rounded-md w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingTodo ? "Edit Todo" : "Create Todo"}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Title:</label>
              <input
                type="text"
                value={editingTodo ? editingTodo.title : newTodo.title}
                onChange={(e) =>
                  editingTodo
                    ? setEditingTodo({
                      ...editingTodo,
                      title: e.target.value,
                    })
                    : setNewTodo({
                      ...newTodo,
                      title: e.target.value,
                    })
                }
                className="w-full border p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Description:
              </label>
              <textarea
                value={
                  editingTodo ? editingTodo.description : newTodo.description
                }
                onChange={(e) =>
                  editingTodo
                    ? setEditingTodo({
                      ...editingTodo,
                      description: e.target.value,
                    })
                    : setNewTodo({
                      ...newTodo,
                      description: e.target.value,
                    })
                }
                className="w-full border p-2"
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
                onClick={() => {
                  setShowModal(false);
                  setEditingTodo(null);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={editingTodo ? handleUpdate : handleCreate}
              >
                {editingTodo ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="min-w-full bg-white border border-gray-300">
        <tbody>
          {todos.map((todo) => (
            <tr key={todo._id}>
              <td className="py-2 px-4 border-b">{todo.title}</td>
              <td className="py-2 px-4 border-b">{todo.description}</td>
              <td className="py-2 px-4 border-b">
                {CAN("delete", "Todo") && (
                  <FaTrash
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(todo._id)}
                  />
                )}

                {CAN("edit", "Todo") && (
                  <FaEdit
                    className="ml-2 text-blue-500 cursor-pointer"
                    onClick={() => handleEdit(todo)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
