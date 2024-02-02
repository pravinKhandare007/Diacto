import { useDraggable } from "@dnd-kit/core";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"
import { NewItem } from "../SortableItem/NewItem";
// import {FaHeading} from 'react-icons/fa';

export default function VideoDraggable(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'Video',
        disabled: props.disabled
    });

    const style = props.disabled ? { backgroundColor: "#E0E0E0" } : null;

    return (

        <NewItem ref={setNodeRef} {...listeners} {...attributes}>
            <div className="draggable" data-tooltip-id="my-tooltip"
                data-tooltip-content={props.disabled ? "disabled":"Drag to add video content"}
                data-tooltip-place="left-start" style={style}>
                <i className="fa-solid fa-video"></i>
                <p>Video</p>
            </div>
            <Tooltip id="my-tooltip" />
        </NewItem>
    )
} 