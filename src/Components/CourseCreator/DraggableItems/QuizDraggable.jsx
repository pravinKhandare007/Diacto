import { useDraggable } from "@dnd-kit/core";
// import {FaHeading} from 'react-icons/fa';
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import './DraggableStyle.css'
import { NewItem } from "../SortableItem/NewItem";


export default function QuizDraggable(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'Quiz',
        disabled: props.disabled
    });

    const style = props.disabled ? { backgroundColor: "#E0E0E0" } : null;

    return (
        <NewItem ref={setNodeRef} {...listeners} {...attributes}>
            <div data-tooltip-id="my-tooltip" data-tooltip-content={props.disabled ? "disabled":"Drag to add quiz questions"} data-tooltip-place="left-start" className="draggable" style={style}>
                <i class="fa-solid fa-q"></i>
                <p>Quiz</p>
                
            </div>
            <Tooltip id="my-tooltip" />
        </NewItem>


    )
} 