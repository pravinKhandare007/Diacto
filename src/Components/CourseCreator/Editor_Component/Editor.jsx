import React, { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill"; // Import Quill from react-quill
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import quill from "quill";

window.Quill = quill;

Quill.register("modules/imageResize", ImageResize);

const Editor = ({ slidesData, setSlidesData, slideId, placeholder, data , contentId , isSorted ,setIsDataSaved}) => {
  
  const [editorContent , setEditorContent] = useState("");

  useEffect(()=>{
    if(data){
      setEditorContent(data);
    }else{
      setEditorContent('');
    }
  },[slideId , isSorted])

  useEffect(()=>{
    setSlidesData((slidesData)=>{
      const newSlidesData = {...slidesData , slides:[...slidesData.slides.map((slide)=>{
        if(slide.id === slideId ){
          return {
            id:slide.id,
            content:[...slide.content.map((contentObject)=>{
              if(contentObject.id === contentId ){
                return{
                  id:contentObject.id,
                  type:contentObject.type,
                  data:editorContent
                }
              }
              return{
                ...contentObject
              }
            })]
          }
        }else{
          return {...slide}
        }
      })]}
      return newSlidesData;
    })
  },[editorContent])

  const handleChange = (html) => {
    setIsDataSaved(false);
    setEditorContent(html);
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ align: "" }, { align: "center" }, { align: "right" }, { align: "justify" }],
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],

      ["link", "image", "video"],
      ["clean"]
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"]
    }
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align"
  ];

  return (
     <ReactQuill
      onChange={handleChange}
      value={editorContent}
      modules={modules}
      formats={formats}
      bounds="#root"
      placeholder={placeholder}
    />
  );
};

export default Editor;