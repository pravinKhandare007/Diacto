import { useDraggable } from "@dnd-kit/core";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"
import { NewItem } from "../SortableItem/NewItem";

export default function Image(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'Image',
        disabled: props.disabled
    });

    const style = props.disabled ? { backgroundColor: "#E0E0E0" } : null;

    return (
        //styling for this component is same as all other draggable components all have class draggable
        <NewItem ref={setNodeRef} {...listeners} {...attributes}>
            <div className="draggable" data-tooltip-id="my-tooltip" data-tooltip-content={props.disabled ? "disabled" : "Drag to add info-graphic image"}
                data-tooltip-place="left-start" style={style}>
                <i className="fa-regular fa-image image"></i>
                <p>Info-Graphic</p>
                
            </div>
            <Tooltip id="my-tooltip" />
        </NewItem>




    )
}