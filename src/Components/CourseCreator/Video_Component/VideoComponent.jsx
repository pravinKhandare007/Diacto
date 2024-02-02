import { useEffect, useState } from "react";
import YouTubeVideo from "./YouTubeVideo";

const VideoComponent = ({slidesData , setSlidesData , slideId , contentId , data , isSorted,setIsDataSaved}) => {
   
   const [videoData , setVideoData ] = useState({
    renderComponent:"choiceComponent" , 
    ytData : {
        videoUrl:"",
        videoId:""
    }
   })
   const [reRenderChid , setReRenderChild] = useState(false);
   //when videoComponents parent re-renders then videoState is lost 
   useEffect(()=>{
    if(data){
        setVideoData(data);
    }else{
        setVideoData({
            renderComponent:"choiceComponent" , 
            ytData : {
                videoUrl:"",
                videoId:""
            }
           })
    }
    setReRenderChild(!reRenderChid);
   },[slideId , isSorted])

   useEffect(()=>{
        setSlidesData((slidesData)=>{
            const newSlidesData = {
                ...slidesData, slides: [...slidesData.slides.map((slide) => {
                    if (slide.id === slideId) {
                        //console.log("slide.slideId: ", slide.id);
                        return {
                            id: slide.id,
                            content: [...slide.content.map((contentObject) => {
                                if (contentObject.id === contentId) {
                                    return {
                                        id: contentObject.id,
                                        type: contentObject.type,
                                        data: videoData
                                    }
                                }
                                return {
                                    ...contentObject
                                }
                            })]
                        }
                    } else {
                        return { ...slide }
                    }
                })]
            }
            return newSlidesData;
        })
   },[videoData])
   
   
   if(videoData.renderComponent === "choiceComponent"){
    return (
        <div className="d-flex justify-content-center border flex-column align-items-center">
            <div className="video_file d-flex flex-column justify-content-center align-items-center p-3" >
                <label htmlFor={`${contentId}`} style={{cursor:'pointer'}}>choose from pc</label>
                <input type="file" name="desktop_upload" id={`${contentId}`} style={{display:'none'}} />
            </div>
            <div className="yt_video d-flex flex-column justify-content-center align-items-center p-3" style={{cursor:'pointer'}} onClick={()=>{ setVideoData((prevVideoData)=>{
                const newVideoData = {...prevVideoData , renderComponent: "yt_component"};
                return newVideoData;
            })} }>
                Click to upload youtube video
                <i style={{fontSize:'2em'}} class="fa-brands fa-youtube"></i>
            </div>
        </div>
    )
   }
   if(videoData.renderComponent === "yt_component"){
    return (
        <YouTubeVideo videoData={videoData} setVideoData={setVideoData} reRenderChid={reRenderChid}/>
    )
   }
}
 
export default VideoComponent;