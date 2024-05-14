import { atom, selector } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [
      { id: 1, text: "one" },
      { id: 2, text: "two" },
    ],
    doing: [{ id: 3, text: "three" }],
    done: [
      { id: 4, text: "four" },
      { id: 5, text: "five" },
    ],
  },
});
