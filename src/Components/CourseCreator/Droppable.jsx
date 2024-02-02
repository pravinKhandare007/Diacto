import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });



  return (
    <div ref={setNodeRef} className={`bg-white d-flex  ${props.content.length ? "justify-content-start" : "justify-content-center"} align-items-center flex-column`}
      style={{
        border: "1px solid #b6ccd8", position: 'relative', width: '100%', padding: '1em',
        minHeight: '100%', gap: "10px", borderRadius: '20px', height: '100%', overflow: 'auto',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.1)'
      }} >
      {props.children}
      {
        props.selectedQuizId ? null : (
          <div style={{ display: 'flex', flexWrap: 'nowrap' , width:'100%'}}>
            <div style={{width:'1px'}}></div>
            <div className={`bg-white d-flex justify-content-center align-items-center p-3 ${props.content.length ? "border rounded-3 border-secondary" : ""}`}
              style={{ margin: '0px 20px', width: '100%', flexDirection: "column" }}>
              <i className="fa-solid fa-plus" style={{ color: "grey" }}></i>
              <div style={{ color: "grey" }}>drop here</div>
            </div>
            <div style={{width:'10px'}}></div>
          </div>
        )
      }
    </div>
  );
}