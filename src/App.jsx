import { useState, useEffect } from 'react';

export default function App() {
  // 1. Load initial todos from localStorage, or default to an empty array
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('my_todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [inputValue, setInputValue] = useState('');

  // 2. Automatically save todos to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem('my_todos', JSON.stringify(todos));
  }, [todos]);

  // 3. Action handler: Add a new todo
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = {
      id: crypto.randomUUID(),
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  // 4. Action handler: Delete a todo
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 5. Action handler: Toggle completion (Finish)
  const handleToggleFinish = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.header}>My TODO</h1>
        
        {/* Input Area */}
        <form onSubmit={handleAddTodo} style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Add Todo</button>
        </form>

        {/* Todo List Container */}
        <div style={styles.listContainer}>
          {todos.length === 0 ? (
            <p style={styles.emptyText}>No tasks yet. Add one above!</p>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} style={styles.todoRow}>
                <span style={{
                  ...styles.todoText,
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  opacity: todo.completed ? 0.6 : 1
                }}>
                  {todo.text}
                </span>
                <div style={styles.actionGroup}>
                  <button 
                    onClick={() => handleDelete(todo.id)} 
                    style={{...styles.button, ...styles.delBtn}}
                  >
                    Del
                  </button>
                  <button 
                    onClick={() => handleToggleFinish(todo.id)} 
                    style={{...styles.button, ...styles.finishBtn}}
                  >
                    {todo.completed ? 'Undo' : 'Finish'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Minimal inline styling matching your wireframe concept
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
    backgroundColor: '#f5f5f5',
    color: '#333',
  },
  card: {
    border: '2px solid #333',
    borderRadius: '12px',
    padding: '24px',
    width: '400px',
    backgroundColor: '#fff',
    boxShadow: '4px 4px 0px #333',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
  },
  inputGroup: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '8px 12px',
    border: '2px solid #333',
    borderRadius: '6px',
    fontSize: '16px',
  },
  button: {
    padding: '8px 14px',
    border: '2px solid #333',
    borderRadius: '6px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  listContainer: {
    border: '2px solid #333',
    borderRadius: '8px',
    padding: '16px',
    minHeight: '150px',
    backgroundColor: '#fafafa',
  },
  todoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
    border: '2px solid #333',
    borderRadius: '6px',
    marginBottom: '10px',
    backgroundColor: '#fff',
  },
  todoText: {
    fontSize: '16px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '180px',
  },
  actionGroup: {
    display: 'flex',
    gap: '6px',
  },
  delBtn: {
    backgroundColor: '#ffdde1',
  },
  finishBtn: {
    backgroundColor: '#e2f0cb',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: '40px',
  }
};
