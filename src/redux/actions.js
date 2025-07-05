export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const SET_TODOS = "SET_TODOS";
export const SET_TASK_TEXT = "SET_TASK_TEXT";
export const SET_FILTER = "SET_FILTER";

export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: text,
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id,
});

export const updateTodo = (id, text) => ({
  type: UPDATE_TODO,
  payload: { id, text },
});

export const setTodos = (todos) => ({
  type: SET_TODOS,
  payload: todos,
});

export const setTaskText = (text) => ({
  type: SET_TASK_TEXT,
  payload: text,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});
