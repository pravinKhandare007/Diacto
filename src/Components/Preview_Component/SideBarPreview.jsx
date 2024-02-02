import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from "uuid";
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';

const SideBarPreview = ({ mainCourseData , handleSlectedPreviewIds}) => {
   
    console.log("maincourseData : ", mainCourseData);
    
    const [currentSection , setCurrentSection] = useState("");

    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey, () =>
            console.log('totally custom!'),
        );

        return (
            <button
                type="button"
                style={{ border: 'none', backgroundColor: '#f8f9fa', padding: '0', }}
                onClick={decoratedOnClick}
            >
                <i className="fa-solid fa-caret-down"></i>
            </button>
        );
    }
    
    return (
        <>
            <div style={{overflow:'auto', height:'90%'}}>
                <Accordion>
                    {
                        mainCourseData.semesters.map((semester, semIndex) => (
                            <Card>
                                <Card.Header>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}
                                        title={`${semester.name}`}
                                    >
                                        <label onClick={() => { handleSlectedPreviewIds(semester.id, null, null, null, 'semesters') }}
                                            style={{ cursor: 'pointer', maxWidth: '70%',textOverflow: 'ellipsis', overflow: 'hidden' , whiteSpace:'nowrap' }}>
                                            {semester.name}
                                        </label>
                                        <span>
                                            <CustomToggle eventKey={`${semIndex}`} />
                                        </span>

                                    </div>
                                </Card.Header>
                                <Accordion.Collapse eventKey={`${semIndex}`}>
                                    <Card.Body className='testing'>
                                        <Accordion>
                                            {
                                                semester.chapters.map((chapter, chapIndex) => (
                                                    <Card>
                                                        <Card.Header>
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between'
                                                                }}
                                                                title={`${chapter.name}`}
                                                            >
                                                                <label onClick={() => { handleSlectedPreviewIds(semester.id, chapter.id, null, null, 'chapters') }} style={{ cursor: 'pointer' ,maxWidth: '63%',textOverflow: 'ellipsis', overflow: 'hidden' , whiteSpace:'nowrap'}}>{chapter.name}</label>
                                                                <span>
                                                                    <CustomToggle eventKey={`${chapIndex}`}>Click me!</CustomToggle>
                                                                </span>

                                                            </div>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey={`${chapIndex}`}>
                                                            <Card.Body className='testing-2'>
                                                                {
                                                                    chapter.sections.map((section, secIndex) => (
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                                alignContent: "center",
                                                                                backgroundColor: currentSection === section.id ? '#f0f0f0' : 'white',
                                                                            }}
                                                                            className='p-1 border mb-1'
                                                                            title={section.name}
                                                                        >
                                                                            
                                                                            <label onClick={() => { handleSlectedPreviewIds(semester.id, chapter.id, section.id, null, 'sections'); setCurrentSection(section.id) }} style={{ cursor: 'pointer',maxWidth: '63%',textOverflow: 'ellipsis', overflow: 'hidden' , whiteSpace:'nowrap' }}>{section.name}</label>
                                                                        </div>
                                                                    ))
                                                                }
                                                                {
                                                                    chapter.chapterTest.map((q) => (
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                                alignContent: "center",
                                                                                backgroundColor: currentSection === q.id ? '#f0f0f0' : 'white',
                                                                            }}
                                                                            className='p-1 border mb-1'
                                                                            title={`${q.name}`}
                                                                        >
                                                                            
                                                                            <label onClick={() => { handleSlectedPreviewIds(semester.id, chapter.id, null, q.id, 'chapterTest'); setCurrentSection(q.id) }} style={{ cursor: 'pointer',maxWidth: '63%',textOverflow: 'ellipsis', overflow: 'hidden' , whiteSpace:'nowrap' }}>{q.name}</label>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                ))
                                            }
                                        </Accordion>
                                        {
                                            semester.semesterTest.map((q) => (
                                                <Card>
                                                    <Card.Header>
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                justifyContent: 'space-between'
                                                            }}
                                                            title={q.name}
                                                        >
                                                            <label onClick={() => { handleSlectedPreviewIds(semester.id, null, null, q.id, 'semesterTest'); }} style={{ cursor: 'pointer',maxWidth: '63%',textOverflow: 'ellipsis', overflow: 'hidden' , whiteSpace:'nowrap'  }}>{q.name}</label>
                                                            <span>
                                                            </span>
                                                        </div>
                                                    </Card.Header>
                                                </Card>
                                            ))
                                        }
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        ))
                    }
                </Accordion>

            </div>   

        </>);
}

export default SideBarPreview;