import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  UPDATE_TODO,
  SET_TODOS,
  SET_TASK_TEXT, 
} from "./actions";

const initialState = {
  todos: [],
  taskText: "",
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
        taskText: "",
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, status: action.payload.newStatus }
            : todo
        ),
      };

    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.newText }
            : todo
        ),
      };

    case SET_TODOS:
      return { ...state, todos: action.payload };

    case SET_TASK_TEXT:
      return { ...state, taskText: action.payload };

    default:
      return state;
  }
};
