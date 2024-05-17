import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  text-align: center;
  margin-top: 10px;
`;

const ToggleBtn = styled.div`
  background-color: #4c7ea2;
  color: white;
  border: none;
  width: 300px;
  padding: 10px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    background-color: #276894;
    transition: background-color 0.1s ease-in-out;
  }
`;

const AddBoardBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.boardColor};
  color: ${(props) => props.theme.textColor};
  border: none;
  width: 300px;
  padding: 10px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 10px;
  input {
    border-radius: 5px;
    outline: none;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.4) inset;
    background-color: ${(props) => props.theme.cardColor};
    border: none;
    padding: 10px;
    color: ${(props) => props.theme.textColor};
    width: 100%;
    &:focus {
      box-shadow: 0 0 0 2px #5b8ac7 inset;
    }
  }
`;

const AddButton = styled.button`
  font-size: 14px;
  font-weight: 700;
  border: none;
  border-radius: 5px;
  color: ${(props) => props.theme.boardColor};
  padding: 8px 12px;
  background-color: #5b8ac7;
  &:hover {
    cursor: pointer;
    background-color: #74a7eb;
    transition: background-color 0.1s ease-in-out;
  }
`;
const X = styled.div`
  font-size: 14px;
  padding: 8px 10px;
  border-radius: 5px;
  &:hover {
    background-color: #272f27;
    cursor: pointer;
  }
`;
interface IForm {
  boardName: string;
}

function AddBoard() {
  const makeBoard = useSetRecoilState(toDoState);
  const [isToggle, setIsToggle] = useState(false);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ boardName }: IForm) => {
    if (!boardName) return;
    makeBoard((allBoards) => {
      return {
        ...allBoards,
        [boardName + ""]: [],
      };
    });
    setValue("boardName", "");
    setIsToggle((v) => !v);
  };

  const onClick = () => {
    setIsToggle((v) => !v);
  };

  return isToggle ? (
    <AddBoardBox>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("boardName", { required: true })}
          placeholder="Enter board title"
          type="text"
        />

        <Wrapper>
          <AddButton onSubmit={handleSubmit(onValid)}>Add board</AddButton>
          <X onClick={onClick}>
            <span>✕</span>
          </X>
        </Wrapper>
      </form>
    </AddBoardBox>
  ) : (
    <ToggleBtn onClick={onClick}>+ Add a board</ToggleBtn>
  );
}

export default AddBoard;
