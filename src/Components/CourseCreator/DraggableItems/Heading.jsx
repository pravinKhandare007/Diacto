import { useDraggable } from "@dnd-kit/core";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import './DraggableStyle.css'
import { NewItem } from "../SortableItem/NewItem";

export default function Heading(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'Heading',
        disabled: props.disabled
    });

    const style = props.disabled ? {backgroundColor:"#E0E0E0"}:null;

    return (
        <NewItem ref={setNodeRef} {...listeners} {...attributes}>
            <div data-tooltip-id="my-tooltip" style={style} data-tooltip-content={props.disabled ? "disabled" : "Drag to add heading"} data-tooltip-place="left-start" className="draggable" >
                <i className="fa-solid fa-heading"></i>
                <p>Heading</p>
            </div>
            <Tooltip id="my-tooltip" />
        </NewItem>
    )
} 