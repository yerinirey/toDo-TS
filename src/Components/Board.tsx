import { Draggable, Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IToDo, IToDoState, toDoState } from "../atoms";
import { useRecoilState } from "recoil";
import { saveToDos } from "../local";
const Wrapper = styled.div`
  width: 340px;
  padding: 12px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.boardColor};
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  &.dragging {
    filter: drop-shadow(0 0 10px #053d5f);
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 6px;
`;
const DeleteBoard = styled.div`
  border-radius: 5px;
  height: 22px;
  width: 22px;
  text-align: center;
  font-weight: 700;

  &:hover {
    cursor: pointer;
    background-color: rgba(255, 58, 58, 0.582);
  }
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  font-size: 18px;
`;

interface IAreaProps {
  $isDraggingFromThis: boolean;
  $isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>``;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
  index: number;
}

interface IForm {
  toDo: string;
}

const Form = styled.form`
  width: 100%;
`;
const AddBtn = styled.div`
  padding: 10px;
  width: 80%;
  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;
  color: ${(props) => props.theme.textColor};
  &:hover {
    background-color: #272f27;
    transition: background-color 0.1s ease-in-out;
    cursor: pointer;
  }
`;
const AddCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  textarea {
    resize: none;
    border-radius: 10px;
    padding: 10px;
    border: none;
    width: 100%;
    height: 4em;
    font-size: 16px;
    font-weight: 600;
    background-color: ${(props) => props.theme.cardColor};
    color: ${(props) => props.theme.textColor};
    &:focus {
      font-weight: 200;
      font-size: 16px;
      font-weight: 600;
      outline: none;
    }
  }
`;
const AddCardBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  span {
    font-size: 14px;
    font-weight: 700;
    padding: 8px 10px;
    border-radius: 5px;
    &:hover {
      background-color: #272f27;
      cursor: pointer;
    }
  }
`;
const AddCardBtn = styled.button`
  font-weight: 600;
  padding: 8px 12px;
  background-color: #5b8ac7;
  border-radius: 6px;
  color: ${(props) => props.theme.boardColor};
  &:hover {
    cursor: pointer;
    background-color: #74a7eb;
    transition: background-color 0.1s ease-in-out;
  }
`;

function Board({ toDos, boardId, index }: IBoardProps) {
  const [toDo, setToDos] = useRecoilState(toDoState);
  const [toggle, setToggle] = useState(false);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onClick = () => {
    setToDos((allBoards) => {
      const boardIds = Object.keys(allBoards).filter((v) => v !== boardId);
      const reorderBoards = boardIds.reduce((acc, boardId) => {
        acc[boardId] = allBoards[boardId];
        return acc;
      }, {} as IToDoState);
      return reorderBoards;
    });
  };

  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };
  useEffect(() => {
    saveToDos(toDo);
  }, [toDo]);
  return (
    <Draggable draggableId={boardId} index={index}>
      {(magic, snapshot) => (
        <Wrapper
          className={snapshot.isDragging ? "dragging" : ""}
          ref={magic.innerRef}
          {...magic.draggableProps}
        >
          <Header {...magic.dragHandleProps}>
            <Title>{boardId}</Title>
            <DeleteBoard onClick={() => onClick()}>✕</DeleteBoard>
          </Header>
          <Droppable droppableId={boardId}>
            {(magic, info) => (
              <Area
                $isDraggingOver={info.isDraggingOver}
                $isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                ref={magic.innerRef}
                {...magic.droppableProps}
              >
                {toDos.map((toDo, index) => (
                  <DraggableCard
                    key={toDo.id}
                    index={index}
                    toDoId={toDo.id}
                    toDoText={toDo.text}
                  />
                ))}
                {magic.placeholder}
              </Area>
            )}
          </Droppable>
          <Form onSubmit={handleSubmit(onValid)}>
            {toggle ? (
              <AddCardContainer>
                <textarea
                  {...register("toDo", { required: true })}
                  placeholder={`Add task on ${boardId}`}
                />
                <AddCardBtnContainer>
                  <AddCardBtn type="submit">Add card</AddCardBtn>
                  <span onClick={() => setToggle(false)}>✕</span>
                </AddCardBtnContainer>
              </AddCardContainer>
            ) : (
              <AddBtn onClick={() => setToggle(true)}>+Add a card</AddBtn>
            )}
          </Form>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default Board;
