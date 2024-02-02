import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { Item } from './Item';

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function deleteContent(){
    props.setSlidesData((slidesData)=>{
      const newSlidesData = {...slidesData , slides:[ ...slidesData.slides.map((slide)=>{
        if(slide.id === props.slideId){
          return {
            id:slide.id,
            content:[...slide.content.filter((contentObj) => contentObj.id !== props.id)]
          }
        }else{
          return {...slide}
        }
      })]}
      return newSlidesData;
    })
    props.setIsSorted((isSorted)=> !isSorted);
  }
  
  return (
    <Item ref={setNodeRef} style={style} >
      <div className='drag_activator' {...attributes} {...listeners}><i class="fa-solid fa-grip-lines-vertical"></i></div>
      <div  style={{ width:"100%"}}>{props.children}</div>
      {
        props.selectedQuizId ? null : (<div><i onClick={deleteContent}style={{cursor:"pointer"}} className="fa-regular fa-circle-xmark"></i></div>)
      }
    </Item>
  );
}