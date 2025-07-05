import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, toggleComplete, deleteTodo, updateTodo }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {todos.length === 0 ? (
        <div className="text-center py-10 text-gray-400 text-sm italic border border-dashed border-gray-200 rounded-lg">
           No tasks yet. Add your first one to get started!
        </div>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
