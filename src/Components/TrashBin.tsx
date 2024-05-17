import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IAreaProps {
  $isDraggingOver: boolean;
}
const Area = styled.div<IAreaProps>`
  width: 70px;
  height: 70px;
  position: fixed;
  right: 50px;
  bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) =>
    props.$isDraggingOver ? "rgba(0, 0, 0, 0.2)" : "transparent"};
  span {
    font-size: 30px;
  }
  transition: background-color 0.2s ease-in-out;
  pointer-events: none;
`;
function TrashBin() {
  return (
    <Droppable droppableId="trash-bin">
      {(magic, info) => (
        <>
          <Area
            $isDraggingOver={info.isDraggingOver}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            <span>🗑️</span>
            {magic.placeholder ? null : null}
          </Area>
        </>
      )}
    </Droppable>
  );
}

export default TrashBin;
