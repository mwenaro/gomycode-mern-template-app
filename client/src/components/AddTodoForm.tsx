import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { API_CONFIG } from "../config/api";
import type { ITodo } from "./TodoItem";

interface AddTodoFormProps {
  todo: ITodo | null;
  setTodos: (todos: ITodo[]) => void;
  todos: ITodo[];
  setSelectedTodo: (todo: ITodo | null) => void;
}

export function AddTodoForm({ 
  todo, 
  setTodos, 
  todos, 
  setSelectedTodo 
}: AddTodoFormProps) {
  const [newTodo, setNewTodo] = useState<Partial<ITodo>>({ title: "" });
  const { post, put, loading, error, clearError } = useApi();

  useEffect(() => {
    setNewTodo(todo || { title: "" });
    clearError();
  }, [todo, clearError]);

  // Handle input change
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTodo({ ...newTodo, title: e.target.value });
  }

  // Handle form submission
  async function handleSubmit() {
    if (!newTodo.title?.trim()) {
      alert("Please enter a todo title");
      return;
    }

    const isEditing = !!newTodo._id;
    const endpoint = isEditing 
      ? `${API_CONFIG.ENDPOINTS.TODOS}/${newTodo._id}`
      : API_CONFIG.ENDPOINTS.TODOS;

    const apiCall = isEditing ? put : post;

    await apiCall(
      endpoint,
      { title: newTodo.title.trim(), completed: newTodo.completed || false },
      {
        onSuccess: (data) => {
          if (isEditing) {
            setTodos(todos.map(t => t._id === newTodo._id ? data : t));
          } else {
            setTodos([data, ...todos]);
          }
          
          alert(`Todo ${isEditing ? 'updated' : 'added'} successfully`);
          setSelectedTodo(null);
          setNewTodo({ title: "" });
        },
        onError: (error) => {
          console.error("Submit error:", error);
          alert(`Error ${isEditing ? 'updating' : 'adding'} todo: ${error}`);
        }
      }
    );
  }

  // Handle Enter key press
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {newTodo._id ? 'Edit Todo' : 'Add New Todo'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <input
          type="text"
          value={newTodo.title || ""}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter your todo..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={loading}
        />
        
        <button
          onClick={handleSubmit}
          disabled={loading || !newTodo.title?.trim()}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md font-medium transition-colors duration-200 min-w-[80px]"
        >
          {loading 
            ? 'Saving...' 
            : newTodo._id 
            ? 'Update' 
            : 'Add'
          }
        </button>
        
        {newTodo._id && (
          <button
            onClick={() => {
              setSelectedTodo(null);
              setNewTodo({ title: "" });
              clearError();
            }}
            disabled={loading}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white rounded-md font-medium transition-colors duration-200"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
