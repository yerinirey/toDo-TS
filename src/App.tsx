import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IToDoState, toDoState } from "./atoms";
import Board from "./Components/Board";
import AddBoard from "./Components/AddBoard";
import TrashBin from "./Components/TrashBin";
import { useEffect } from "react";
import { saveToDos } from "./local";

const Wrapper = styled.div`
  display: flex;
  position: relative;
  width: 100vw;
  padding: 24px;
  height: 100vh;
`;
const Boards = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: flex-start;
  gap: 10px;
  width: 100%;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragStart = (initial: { draggableId: string }) => {
    // console.log("initial\n", initial);
  };
  const onDragEnd = (info: DropResult) => {
    // console.log(info);
    const { destination, draggableId, source } = info;
    if (!destination) return;

    /* board Movement */
    if (info.type == "boards") {
      setToDos((allBoards) => {
        const boardIds = Object.keys(allBoards);
        boardIds.splice(source.index, 1);
        console.log("After removing:", boardIds);
        boardIds.splice(destination.index, 0, draggableId);
        console.log("After inserting:", boardIds);
        const reorderBoards: IToDoState = {};
        boardIds.forEach((id) => {
          reorderBoards[id] = allBoards[id];
        });
        return reorderBoards;
        /* reduce: 배열을 순회하며 누적기에 값을 추가하는 방법으로 새로운 객체 생성 가능 */
        // const reorderBoards: IToDoState = boardIds.reduce((acc, id) => {
        //   acc[id] = allBoards[id];
        //   return acc;
        // }, {} as IToDoState);
        // return reorderBoards;
      });
    } else {
      if (destination.droppableId === source.droppableId) {
        // card Movement - same board
        setToDos((allBoards) => {
          const boardCopy = [...allBoards[source.droppableId]];
          const taskObj = boardCopy[source.index];
          boardCopy.splice(source.index, 1);
          boardCopy.splice(destination?.index, 0, taskObj);
          return {
            ...allBoards,
            [source.droppableId]: boardCopy,
          };
        });
      }
      if (destination.droppableId === "trash-bin") {
        // card Movement - trash
        console.log("trash!");
        setToDos((allBoards) => {
          const sourceBoard = [...allBoards[source.droppableId]];
          sourceBoard.splice(source.index, 1);
          return {
            ...allBoards,
            [source.droppableId]: sourceBoard,
          };
        });
      } else if (destination.droppableId !== source.droppableId) {
        //card Movement - cross Movement
        setToDos((allBoards) => {
          const sourceBoard = [...allBoards[source.droppableId]];
          const taskObj = sourceBoard[source.index];
          const destinationBoard = [...allBoards[destination.droppableId]];
          sourceBoard.splice(source.index, 1);
          destinationBoard.splice(destination.index, 0, taskObj);
          return {
            ...allBoards,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: destinationBoard,
          };
        });
      }
    }
  };
  console.log(toDos);
  console.log(Object.keys(toDos));
  useEffect(() => {
    saveToDos(toDos);
  }, [toDos]);
  return (
    <Wrapper>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Droppable
          droppableId={"boards"}
          type={"boards"}
          direction={"horizontal"}
        >
          {(magic) => (
            <Boards {...magic.droppableProps} ref={magic.innerRef}>
              {Object.keys(toDos).map((boardId, index) => (
                <Board
                  boardId={boardId}
                  key={boardId}
                  toDos={toDos[boardId]}
                  index={index}
                />
              ))}
              {magic.placeholder}
              <AddBoard />
            </Boards>
          )}
        </Droppable>
        <TrashBin />
      </DragDropContext>
    </Wrapper>
  );
}

export default App;
