import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
`;

interface IAreaProps {
  isDraggingOver: boolean;
}
const Area = styled.div<IAreaProps>`
  padding: 20px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isDraggingOver ? "rgba(0, 0, 0, 0.2)" : "transparent"};
  span {
    font-size: 30px;
  }
  transition: background-color 0.2s ease-in-out;
`;
function TrashBin() {
  return (
    <Wrapper>
      <Droppable droppableId="trash-bin">
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            <span>🗑️</span>
            {/* {magic.placeholder} */}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default TrashBin;
