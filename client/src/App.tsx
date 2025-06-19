import { useEffect, useState } from "react";
import { TodoItem, type ITodo } from "./components/TodoItem";
import { AddTodoForm } from "./components/AddTodoForm";
import { useApi } from "./hooks/useApi";
import { API_CONFIG } from "./config/api";

export default function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);
  const { get, loading, error } = useApi();

  // Fetch todos on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      await get(API_CONFIG.ENDPOINTS.TODOS, {
        onSuccess: (data) => {
          setTodos(data || []);
        },
        onError: (error) => {
          console.error("Error fetching todos:", error);
          alert("Failed to load todos: " + error);
        }
      });
    };

    fetchTodos();
  }, [get]);

  if (loading && todos.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading todos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📝 MERN Todo App
          </h1>
          <p className="text-gray-600">
            A modern todo application built with MongoDB, Express, React & Node.js
          </p>
        </header>

        {/* Add/Edit Todo Form */}
        <AddTodoForm
          setSelectedTodo={setSelectedTodo}
          todo={selectedTodo}
          setTodos={setTodos}
          todos={todos}
        />

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Todos List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Your Todos ({todos.length})
            </h2>
            {todos.length > 0 && (
              <div className="text-sm text-gray-500">
                {todos.filter(t => t.completed).length} completed
              </div>
            )}
          </div>

          {todos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-500 mb-2">No todos yet</h3>
              <p className="text-gray-400">Add your first todo above to get started!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {todos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                  setSelectedTodo={setSelectedTodo}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>Built with ❤️ using the MERN Stack</p>
          <p className="mt-1">
            <a 
              href="https://github.com/mwenaro/gomycode-mern-template-app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              View on GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
