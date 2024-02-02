import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"
import { NewItem } from '../SortableItem/NewItem';

export default function Text(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'Text',
    disabled: props.disabled
  });

  const style = props.disabled ? { backgroundColor: "#E0E0E0" } : null;


  return (
    // <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
    //   Text Field
    // </button>
    <NewItem ref={setNodeRef} {...listeners} {...attributes}>
      <div style={style} data-tooltip-id="my-tooltip" data-tooltip-content={props.disabled ? "disabled":"Drag to add text editor"} data-tooltip-place="left-start" className="draggable">
        <i className="fa-regular fa-pen-to-square" ></i>
        <p>Text</p>
        
      </div>
      <Tooltip id="my-tooltip" />
    </NewItem>


    // <AiOutlineFileText  ref={setNodeRef} style={style} {...listeners} {...attributes} className='text'></AiOutlineFileText>
  );
}