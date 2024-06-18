import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  border-radius: 10px;
  padding: 10px;
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 10px;
  &:hover {
    box-shadow: 0 0 0 2px #84b8fd inset;
  }
  &.dragging {
    background-color: rgba(94, 94, 94, 0.589);
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  }
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}
function DraggableCard({ toDoId, toDoText, index }: IDraggableCardProps) {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          className={snapshot.isDragging ? "dragging" : ""}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
