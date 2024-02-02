import React, { useEffect, useState } from 'react';
// import './PreviewCourseCreator.css'
import '../CourseCreator/CourseCreator.css';
//../CourseCreator/CourseCreator.css
import Pagination from '../Pagination/Pagination';

import { v4 as uuidv4 } from 'uuid';

const CourseCreatorPreview = ({ mainCourseData, selectedSemPreviewId, selectedChapterPreviewId, selectedSectionPreviewId, selectedQuizPreviewId, slideId , previewType,courseInfo }) => {

    console.log("rendering course creater");
    const [currentSlideId, setCurrentSlideId] = useState(null); // will contain the id of the current slide
    //rename slidesData
    //api we need to send sectionID and body -- sildesData.
    //sample api endpoint = /api/section/:sectionId 
    //api body = slidesData

    const [slidesData, setSlidesData] = useState(null);

    function getDataFromParent(semId, chapId, secId, quizId) {

        const semester = mainCourseData.semesters ? mainCourseData['semesters'].find(semObj => semObj.id === semId) : null
        const chapter = semester ? semester['chapters'].find(chapObj => chapObj.id === chapId) : null
        const section = chapter ? chapter['sections'].find(sectionObj => sectionObj.id === secId) : null
        const chapterTest = chapter?.chapterTest ? chapter['chapterTest'].find(chapterTestObj => chapterTestObj.id === quizId) : null
        const semesterTest = semester?.semesterTest ? semester['semesterTest'].find(semesterTestObj => semesterTestObj.id === quizId) : null

        if (previewType === 'semesters') {
            if (semester) {
                setSlidesData(semester?.content ? semester.content : null);
                setCurrentSlideId(semester.content ? semester.content.slides[0].id :null);
            }
        }
        if (previewType === 'chapters') {
            if (chapter) {
                setSlidesData(chapter.content ? chapter.content : null);
                setCurrentSlideId(chapter.content ? chapter.content.slides[0].id : null);
            };
        }
        if (previewType === 'sections') {
            if (section) {
                setSlidesData(section.content ? section.content : null);
                setCurrentSlideId(section.content ? section.content.slides[0].id : null);
            }
        }
        if (previewType === 'chapterTest') {
            if (chapterTest) {
                setSlidesData(chapterTest.content ? chapterTest.content : null)
                setCurrentSlideId(chapterTest.content ? chapterTest.content.slides[0].id : null);

            }
        }
        if (previewType === 'semesterTest') {
            if (semesterTest) {
                setSlidesData(semesterTest.content ? semesterTest.content : null)
                setCurrentSlideId(semesterTest.content ? semesterTest.content.slides[0].id : null);

            }
        }
    }

    useEffect(() => {
        console.log("setting slides data from mainCourseData");
        getDataFromParent(selectedSemPreviewId,selectedChapterPreviewId,selectedSectionPreviewId,selectedQuizPreviewId)
    }, [selectedSectionPreviewId, selectedSemPreviewId, selectedChapterPreviewId, selectedQuizPreviewId]);

    useEffect(() => {
        if (slideId) {
            setCurrentSlideId(slideId);
        }

    }, [])

    function paginate(currentSlideId) {
        setCurrentSlideId(currentSlideId);
    }

    //if the slides data is null you give a message to teacher that there is no data in the semester.
    return (<>
        {
            slidesData ? (
                <div className='course_creator_container'>
                    <div className='slides_container' style={{ width: "100%", display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ padding: "1em 2em" }}>
                                <span><strong>Course Name:</strong>{courseInfo.course_name}</span><br></br>
                                <span><strong>Subject:</strong> {courseInfo.subject_name}</span><br></br>
                                <span><strong>Description:</strong>{courseInfo.course_description ? courseInfo.course_description : 'description not added'}</span>
                            </div>
                        <div className='slide'>
                            {
                                <div style={{ border: "1px solid #b6ccd8", position: 'relative', width: '100%', padding: '1em', minHeight: '100%', display: "flex", flexDirection: "column", gap: "10px", backgroundColor: "#ffffff", borderRadius: '12px' }}>
                                    {
                                        slidesData.slides.filter(slide => slide.id === currentSlideId)[0].content.map((contentObj) => {
                                            if (!contentObj.data) return;
                                            if (contentObj.type === "Heading") {
                                                return (
                                                    <div className='copy-ql-editor'>
                                                        <span className="heading_from_top" style={{ fontSize: "20px", fontWeight: '400', lineHeight: '145%', width: '100%', color: 'black' }}>{contentObj.data}</span>
                                                    </div>
                                                )
                                            }
                                            if (contentObj.type === "Text") {
                                                return (
                                                    <div className='ql-snow'>
                                                        <div dangerouslySetInnerHTML={{ __html: contentObj.data }} className='ql-editor'>

                                                        </div>
                                                    </div>
                                                )
                                            }
                                            if (contentObj.type === "Quiz") {
                                                return (
                                                    <div className='' style={{fontSize:'1.5em'}}>
                                                        <div>
                                                            <span>{`Q) `}</span>
                                                            <span>{contentObj.data.question}</span><br />
                                                            <div style={{ width: "100%", display: "flex",justifyContent: "start" , paddingLeft:'22px' , justifyContent:'space-between' }}>
                                                                {contentObj.data.imageData.image && (
                                                                    <div style={{ width: contentObj.data.imageData.width ? contentObj.data.imageData.width : 'auto', height: contentObj.data.imageData.height ? contentObj.data.imageData.height : 'auto' }}>
                                                                        <img id={"imgId"} src={URL.createObjectURL(contentObj.data.imageData.image)} style={{ height: "100%", width: "100%" }}></img>
                                                                    </div>
                                                                )}

                                                            </div>
                                                            <div>
                                                                {
                                                                    contentObj.data.type === 'single' ? (
                                                                        contentObj.data.options.map((option, optIndex) => {
                                                                            return (
                                                                                <div style={{marginLeft:'22px' , paddingTop: "0.2em" }}>
                                                                                    <input type='radio' style={{ marginRight: "3px" }} value={option} id={`option${optIndex}`} name={`reord`}></input><label for={`option${optIndex}`}>{option}</label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    ) : (
                                                                        contentObj.data.options.map((option, optIndex) => {
                                                                            return (
                                                                                <div style={{ paddingTop: "0.2em" }}>
                                                                                    <input type='checkbox' style={{ marginRight: "3px" }} value={option} id={`option${optIndex}`} name={`reord`}></input><label for={`option${optIndex}`}>{option}</label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>

                                                )
                                            }
                                            if (contentObj.type === "Image") {
                                                return (
                                                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                                        {contentObj.data.imgData && (
                                                            <div style={{ width: contentObj.data.width ? contentObj.data.width : 'auto', height: contentObj.data.height ? contentObj.data.height : 'auto' }}>
                                                                <img id={"imgId"} src={URL.createObjectURL(contentObj.data.imgData)} style={{ height: "100%", width: "100%" }}></img>
                                                            </div>
                                                        )}

                                                    </div>
                                                )
                                            }
                                            if (contentObj.type === "Video") {
                                                return (
                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                        {contentObj.data.ytData.videoId &&
                                                            <iframe
                                                                style={{ marginTop: '1em' , minHeight:'415px' }}
                                                                width="100%"
                                                                src={`https://www.youtube.com/embed/${contentObj.data.ytData.videoId}?rel=0`}
                                                                title="YouTube Video"
                                                                frameBorder="0"
                                                                allowFullScreen={false}
                                                            ></iframe>
                                                        }
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                    <div style={{ height: '50px' }}>

                                    </div>
                                </div>
                            }
                        </div>
                        <div style={{borderTop:'1px solid #b6ccd8'}}>
                            <div className='pagination_container' >
                                <Pagination slides={slidesData.slides} paginate={paginate} currentSlideId={currentSlideId} setCurrentSlideId={setCurrentSlideId}></Pagination>
                            </div>
                        </div>
                    </div>
                </div>) : <div></div>
        }
    </>);
}

export default CourseCreatorPreview;


