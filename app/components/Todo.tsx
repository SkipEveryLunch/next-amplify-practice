'use client';

import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  name: string;
}

export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todos`);
    const data = await response.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newTodo }),
    });

    setNewTodo('');
    fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    fetchTodos();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-4">Todoリスト</h1>
      
      <form onSubmit={addTodo} className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="新しいTodoを入力"
          className="border p-2 mr-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          追加
        </button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span>{todo.name}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 