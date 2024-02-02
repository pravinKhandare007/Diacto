import { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import CourseCreator from "../CourseCreator/CourseCreator";
import './CourseBuilder.css'
import axios from "axios";
import SideBarPreview from "../Preview_Component/SideBarPreview";
import CourseCreatorPreview from "../Preview_Component/CourseCreatorPreview";
import { v4 as uuidv4 } from "uuid";
import { Link, useParams } from "react-router-dom";


const CourseBuilder = () => {
    console.log("rendering parent");
    const [courseInfo, setCourseInfo] = useState(null);
    //useParam 
    const [selectedSemId, setSelectedSemId] = useState(null);
    const [selectedChapterId, setSelectedChapterId] = useState(null);
    const [selectedSectionId, setSelectedSectionId] = useState(null);
    const [selectedQuizId, setSelectedQuizId] = useState(null);
    const [mainCourseData, setMainCourseData] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [type, setType] = useState('');

    //ids for preview components 
    const [selectedSemPreviewId, setSelectedSemPreviewId] = useState(null);
    const [selectedChapterPreviewId, setSelectedChapterPreviewId] = useState(null);
    const [selectedSectionPreviewId, setSelectedSectionPreviewId] = useState(null);
    const [selectedQuizPreviewId, setSelectedQuizPreviewId] = useState(null);
    const [previewType, setPreviewType] = useState("");

    //below state is to store the information about which slide the teacher is on so on app re-render we have the same slide 
    const [slideId, setSlideId] = useState('')

    //below state is to store information about the open dropdowns. which is passed to preview component 
    const [semesterDropdownInfo, setSemesterDropdownInfo] = useState('');
    const [chapterDropdownInfo, setChapterDropdownInfo] = useState('');

    //below state is used to execute the useEffect in course creator component which sets slidesData state when a semster is deleted.
    const [isDeleted, setIsDeleted] = useState(false);

    //to toggle sidebar
    const [toggle, setToggle] = useState(false);
    //flag to store if data is saved or not
    const [isDataSaved, setIsDataSaved] = useState(true);
    const [showSaveDataModal, setShowSaveDataModal] = useState(false);
    const { courseId } = useParams();

    useEffect(() => {
        axios.get('http://localhost:3001/api/fetch-course-info', {
            params: {
                courseId: courseId
            }
        }).then((res) => {
            console.log(res.data.rows, res.data);
            setCourseInfo(res.data.rows)
        })
    }, [])

    useEffect(() => {
        console.log("last parent render : , ", mainCourseData);
    })

    const handleSlectedIds = (semId, chapId, secId, quizId, type) => {
        setType(type);
        setSelectedSemId(semId);
        setSelectedChapterId(chapId);
        setSelectedSectionId(secId);
        setSelectedQuizId(quizId);
    }

    const resetSelectedIds = () => {
        setSelectedSemId(null);
        setSelectedChapterId(null);
        setSelectedSectionId(null);
        setSelectedQuizId(null);
        setType(null);
        setSlideId(null); //if not setted to null then when user deletes a sem, chap, sec. adds a new sem chap or sec and clicks on that. currentSlideId is set to the deleted slides Id.
    }

    function saveCourseData() {
        axios.post("/api/courses", mainCourseData);
    }

    function setPreviewIds() {
        setSelectedSemPreviewId(selectedSemId);
        setSelectedChapterPreviewId(selectedChapterId);
        setSelectedSectionPreviewId(selectedSectionId);
        setSelectedQuizPreviewId(selectedQuizId);
        setPreviewType(type);
    }

    const handleSlectedPreviewIds = (semId, chapId, secId, quizId, type) => {
        setSelectedSemPreviewId(semId);
        setSelectedChapterPreviewId(chapId);
        setSelectedSectionPreviewId(secId);
        setSelectedQuizPreviewId(quizId);
        setPreviewType(type);
    }

    function handleToggle() {
        setToggle(!toggle);
    }

    return (<>
        <div className="builder_container">
            {
                showPreview ? (
                    <>
                        <div className={toggle ? 'active-sidebar' : 'sidebar_container'}>
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '1em', alignItems: 'center', height: '10%' }}>
                                <button onClick={() => { setShowPreview((showPreview) => !showPreview) }} className="all-courses-button"><span><i className="fa-solid fa-arrow-left-long"></i></span> Back</button>
                            </div>
                            <SideBarPreview
                                handleSlectedPreviewIds={handleSlectedPreviewIds}
                                mainCourseData={mainCourseData}
                            />
                        </div>
                        <CourseCreatorPreview
                            mainCourseData={mainCourseData}
                            selectedSemPreviewId={selectedSemPreviewId}
                            selectedChapterPreviewId={selectedChapterPreviewId}
                            selectedSectionPreviewId={selectedSectionPreviewId}
                            selectedQuizPreviewId={selectedQuizPreviewId}
                            slideId={slideId}
                            previewType={previewType}
                            courseInfo={courseInfo}
                        />
                    </>) : (
                    <>
                        <div className={toggle ? 'active-sidebar' : 'sidebar_container'}>
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '1em', alignItems: 'center', height: '10%' }}>
                                <Link to='/courses'><button className="all-courses-button"><span><i className="fa-solid fa-arrow-left-long"></i></span> All Courses</button></Link>
                            </div>
                            <SideBar
                                mainCourseData={mainCourseData}
                                setMainCourseData={setMainCourseData}
                                resetSelectedIds={resetSelectedIds}
                                semesterDropdownInfo={semesterDropdownInfo}
                                chapterDropdownInfo={chapterDropdownInfo}
                                setSemesterDropdownInfo={setSemesterDropdownInfo}
                                setChapterDropdownInfo={setChapterDropdownInfo}
                                handleSlectedIds={handleSlectedIds}
                                setIsDeleted={setIsDeleted}
                                isDataSaved={isDataSaved}
                                setShowSaveDataModal={setShowSaveDataModal}
                            />
                        </div >
                        <div className="slides-container">
                            <CourseCreator
                                mainCourseData={mainCourseData} setMainCourseData={setMainCourseData}
                                selectedChapterId={selectedChapterId}
                                selectedSectionId={selectedSectionId}
                                selectedSemId={selectedSemId}
                                resetSelectedIds={resetSelectedIds}
                                selectedQuizId={selectedQuizId}
                                setSlideId={setSlideId}
                                slideId={slideId}
                                type={type}
                                isDeleted={isDeleted}
                                showPreview={showPreview}
                                setShowPreview={setShowPreview}
                                setPreviewIds={setPreviewIds}
                                setIsDataSaved={setIsDataSaved}
                                courseInfo={courseInfo}
                                setShowSaveDataModal={setShowSaveDataModal}
                                showSaveDataModal={showSaveDataModal}
                            />
                        </div>
                    </>
                )
            }
        </div >
    </>
    );
}

export default CourseBuilder;



{/* <div className="title">

<div>
    <span><strong>Course Name:</strong> {name}</span><br></br>
    <span><strong>Subject:</strong> {subject}</span><br></br>
    <span><strong>Description:</strong> {discription}</span>
</div>
<div style={{ textAlign: "right", marginBottom: "10px" }}>
    {
        showPreview ? (<button className="primary_cta_button" onClick={() => { setShowPreview((showPreview) => !showPreview) }}>Go Back</button>) : (
            <><button className="primary_cta_button" style={{ marginRight: "5px" }}>Save Course</button>
                <button onClick={() => { setShowPreview((showPreview) => !showPreview); setPreviewIds() }} className='primary_cta_button'>Preview</button></>
        )
    }
</div>
</div>
<div className="toggle"><i onClick={handleToggle} className="fa-solid fa-bars"></i></div>
<div className="course_builder_container">
{
    showPreview ? (
        <>
            <div className={toggle ? 'active-sidebar':'sidebar_container'}>     
                <SideBarPreview
                    handleSlectedPreviewIds={handleSlectedPreviewIds}
                    mainCourseData={mainCourseData}
                />
            </div>
            <CourseCreatorPreview
                mainCourseData={mainCourseData}
                selectedSemPreviewId={selectedSemPreviewId}
                selectedChapterPreviewId={selectedChapterPreviewId}
                selectedSectionPreviewId={selectedSectionPreviewId}
                selectedQuizPreviewId={selectedQuizPreviewId}
                slideId={slideId}
                previewType={previewType}
            />
        </>
    ) : (
        <>
            <div className={toggle ? 'active-sidebar':'sidebar_container'}>
                <SideBar
                    mainCourseData={mainCourseData}
                    setMainCourseData={setMainCourseData}
                    resetSelectedIds={resetSelectedIds}
                    semesterDropdownInfo={semesterDropdownInfo}
                    chapterDropdownInfo={chapterDropdownInfo}
                    setSemesterDropdownInfo={setSemesterDropdownInfo}
                    setChapterDropdownInfo={setChapterDropdownInfo}
                    handleSlectedIds={handleSlectedIds}
                    setIsDeleted={setIsDeleted}
                />
            </div>
            <CourseCreator
                mainCourseData={mainCourseData} setMainCourseData={setMainCourseData}
                selectedChapterId={selectedChapterId}
                selectedSectionId={selectedSectionId}
                selectedSemId={selectedSemId}
                resetSelectedIds={resetSelectedIds}
                selectedQuizId={selectedQuizId}
                setSlideId={setSlideId}
                slideId={slideId}
                type={type}
                isDeleted={isDeleted}
            />

        </>
    )
}
</div> */}

