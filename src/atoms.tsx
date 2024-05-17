import { atom, selector } from "recoil";
import { loadToDos } from "./local";

export interface IToDo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: loadToDos() ?? {
    "To Do": [
      { id: 1, text: "make" },
      { id: 2, text: "whatever" },
    ],
    doing: [{ id: 3, text: "you" }],
    done: [
      { id: 4, text: "want" },
      { id: 5, text: "for" },
      { id: 6, text: "free :3" },
    ],
  },
});
