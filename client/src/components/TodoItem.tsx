import { useApi } from '../hooks/useApi';
import { API_CONFIG } from '../config/api';

export interface ITodo {
  _id?: string;
  title: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface TodoItemProps {
  todo: ITodo;
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
  setSelectedTodo: (todo: ITodo | null) => void;
}

export function TodoItem({ 
  todo: { title, _id, completed }, 
  setSelectedTodo, 
  todos, 
  setTodos 
}: TodoItemProps) {
  const { delete: deleteTodo, put: updateTodo, loading } = useApi();

  async function handleDelete() {
    if (!_id) return;

    await deleteTodo(`${API_CONFIG.ENDPOINTS.TODOS}/${_id}`, {
      onSuccess: () => {
        setTodos(todos.filter(t => t._id !== _id));
        alert("Todo deleted successfully");
      },
      onError: (error) => {
        console.error("Delete error:", error);
        alert("Error deleting todo: " + error);
      }
    });
  }

  async function handleUpdate() {
    if (!_id) return;

    await updateTodo(
      `${API_CONFIG.ENDPOINTS.TODOS}/${_id}`, 
      { completed: !completed },
      {
        onSuccess: () => {
          setTodos(todos.map(t => 
            t._id === _id ? { ...t, completed: !t.completed } : t
          ));
        },
        onError: (error) => {
          console.error("Update error:", error);
          alert("Error updating todo: " + error);
        }
      }
    );
  }

  return (
    <div className={`bg-white border rounded-lg shadow-sm my-2 flex justify-between items-center p-4 transition-all duration-200 hover:shadow-md ${
      completed ? 'bg-gray-50' : ''
    }`}>
      <h3 
        className={`flex-1 cursor-pointer transition-all ${
          completed 
            ? "line-through text-gray-500" 
            : "text-gray-800 hover:text-blue-600"
        }`}
        onClick={handleUpdate}
        title={completed ? "Click to mark as incomplete" : "Click to mark as complete"}
      >
        {title}
      </h3>
      
      <div className="flex gap-2 ml-4">
        <button
          onClick={() => setSelectedTodo(todos.find(t => t._id === _id) || null)}
          className="px-3 py-1 rounded-md bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors duration-200 disabled:opacity-50"
          disabled={loading}
          title="Edit todo"
        >
          Edit
        </button>
        
        <button
          onClick={handleDelete}
          className="px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors duration-200 disabled:opacity-50"
          disabled={loading}
          title="Delete todo"
        >
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}
