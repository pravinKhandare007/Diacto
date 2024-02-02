import axios from "axios";
import { useState } from "react";

const CreateCourseForm = () => {
    const [courseDetails , setCourseDetails] = useState({
        courseName : '',
        subject:'',
        description:'',
        grade:''
    });
    const [error , setError] = useState({
        courseName : '',
        subject:'',
        description:'',
        grade:''
    })

    function handleCreateCourseFormSubmit(e){
        e.preventDefault();
        const response = axios.post('/courses' , courseDetails);
    }

    function handleCourseName(e){
        setCourseDetails({...courseDetails , courseName: e.target.value});
    }

    function handleSubject(e){
        setCourseDetails({...courseDetails , subject: e.target.value});
    }

    function handleDescription(e){
        setCourseDetails({...courseDetails , description: e.target.value});
    }

    function handleGrade(e){
        setCourseDetails({...courseDetails , grade  : e.target.value});
    }
    
    return (
        <>
            <form onSubmit={handleCreateCourseFormSubmit} id="create-course-form">
                <label htmlFor="name">
                    Course Name: 
                </label>
                <input id="name" value={courseDetails.courseName} onChange={handleCourseName}/>
                <label htmlFor="subject">
                    Subject:
                </label>
                <input id="subject" value={courseDetails.subject} onChange={handleSubject}/>
                <label htmlFor="description">
                    Description:
                </label>
                <input id="subject" value={courseDetails.description} onChange={handleDescription}/>
                <label>
                    Grade:
                </label>
                <select onChange={handleGrade}>
                    <option selected>select grade</option>
                    <option value={'1'}>class 1</option>
                    <option value={'2'}>class 2</option>
                    <option value={'3'}>class 3</option>
                    <option value={'4'}>class 4</option>
                    <option value={'5'}>class 5</option>
                </select>
                <button htmlFor='create-course-form'>Create Course</button>
            </form>
        </>
    );
}

export default CreateCourseForm;