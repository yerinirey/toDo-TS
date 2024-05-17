import { IToDoState } from "./atoms";

export const LOCAL_TODOS = "local_todos";

export const loadToDos = () => {
  const localToDos = localStorage.getItem(LOCAL_TODOS);
  if (localToDos) {
    return JSON.parse(localToDos);
  }
  return null;
};

export const saveToDos = (todos: IToDoState) => {
  localStorage.setItem(LOCAL_TODOS, JSON.stringify(todos));
};
