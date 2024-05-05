import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
  category: "DONE" | "DOING" | "TO_DO";
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
