import { useEffect, useState } from "react";
import { Resizable } from 're-resizable';
import './McqComponent.css'

const McqComponent = ({ setSlidesData, slideId, contentId, slidesData, data, isSorted }) => {
    //isSorted is toggled when there is a sort opration, isSorted is required because McqComponent was not setting the data from the parent after the sort happend 
    console.log("rendering mcq component")
    const [mcq, setMcq] = useState(null);

    useEffect(() => {
        if (data) {
            setMcq(data);
        } else {
            setMcq({
                question: '',
                options: [''],
                correctAnswer: { option0: false },
                type: 'single',
                imageData: { image: '', width: '400px', height: '' }
            });
        }
    }, [slideId, isSorted])

    useEffect(() => {
        console.log("mcq useEffect 2 setting parent data to ", mcq)
        setSlidesData((slidesData) => {
            const newSlidesData = { ...slidesData };
            newSlidesData.slides = slidesData.slides.map((slide) => {
                console.log("slide id : ", slideId);
                if (slide.id === slideId) {
                    return {
                        ...slide, content: slide.content.map((contentObj) => {
                            console.log("content id of parent: ", contentObj.id);
                            console.log('content id of componet', contentId);
                            if (contentId === contentObj.id) {
                                return {
                                    ...contentObj, data: mcq
                                }
                            } else {
                                return {
                                    ...contentObj
                                }
                            }
                        })
                    }
                } else {
                    return {
                        ...slide
                    }
                }
            })

            return newSlidesData;

        })
    }, [mcq])

    function updateQuestion(e) {
        setMcq({ ...mcq, question: e.target.value })
    }

    function saveCorrectAnswer(e, optionIndex) {
        if (mcq.type === 'single') {
            const newCorrectAnswer = { ...mcq.correctAnswer };//new obj option0 option1
            console.log("newCorrectAnswer 1", newCorrectAnswer)
            newCorrectAnswer[`option${optionIndex}`] = true;
            console.log("newCorrectAnswer 2", newCorrectAnswer)
            for (let option in newCorrectAnswer) {
                if (option !== `option${optionIndex}`) {
                    console.log("key : ", option, "mathched with ", `option${optionIndex}`);
                    newCorrectAnswer[option] = false; //one word takes 2 hours to debug 
                }
                console.log("newCorrectAnswer", newCorrectAnswer)
            }
            console.log("newCorrectAnswer last", newCorrectAnswer)
            setMcq({ ...mcq, correctAnswer: newCorrectAnswer });
        }
        if (mcq.type === "multiple") {
            if (e.target.checked) {
                const newCorrectAnswer = { ...mcq.correctAnswer };
                newCorrectAnswer[`option${optionIndex}`] = true;
                setMcq({ ...mcq, correctAnswer: newCorrectAnswer });
            } else {
                const newCorrectAnswer = { ...mcq.correctAnswer };
                newCorrectAnswer[`option${optionIndex}`] = false;
                setMcq({ ...mcq, correctAnswer: newCorrectAnswer });
            }
        }
    }

    function saveOption(e, optionIndex) {
        const newMcq = { ...mcq };
        newMcq.options[optionIndex] = e.target.value;
        const newCorrectAnswer = { ...newMcq.correctAnswer }
        if (!e.target.value) {
            newCorrectAnswer[`option${optionIndex}`] = false;
            console.log(newCorrectAnswer);
        }
        newMcq.correctAnswer = newCorrectAnswer;
        setMcq(newMcq);
    }

    function addOption() {
        const newMcq = { ...mcq };
        newMcq.options.push('');
        newMcq.correctAnswer[`option${newMcq.options.length - 1}`] = false;
        setMcq(newMcq);
    }

    function deleteOption(optIndex) {
        setMcq({ ...mcq, options: mcq.options.filter((option, index) => index !== optIndex) })
    }

    function handleSingleOrMultiple(e) {
        const newCorrectAnswer = { ...mcq.correctAnswer };
        for (let option in newCorrectAnswer) {
            newCorrectAnswer[option] = false;
        }
        setMcq({ ...mcq, type: e.target.value, correctAnswer: newCorrectAnswer })
    }

    function handleImageUpload(event) {
        const image = event.target.files[0];
        event.target.value = null;
        setMcq({ ...mcq, imageData: { ...mcq.imageData, image: image } })
    }

    function handleResize(e, d, ref, delta) {
        setMcq({ ...mcq, imageData: { ...mcq.imageData, width: ref.style.width, height: ref.style.height, } })
    }

    function handleDeleteImage() {
        setMcq({ ...mcq, imageData: { ...mcq.imageData, image: '', width: '400px', height: '300px' } })
    }

    return (
        <>
            {
                mcq &&
                <div className="border p-3">
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px' }}>
                        <span>Q{')'}</span>
                        <textarea rows={3} type="text" placeholder="Question" value={mcq.question} onChange={(e) => { updateQuestion(e) }} style={{ width: '90%', marginBottom: '10px', resize: 'none' }}></textarea>
                        <div>
                            <label htmlFor={`mcq-image${contentId}`}><i style={{ cursor: 'pointer' }} class="fa-regular fa-image"></i></label>
                            <input type='file' accept='image/*' id={`mcq-image${contentId}`} onChange={(event) => handleImageUpload(event)} style={{ display: "none" }}></input>
                        </div>

                    </div>
                    {mcq.imageData.image ? (
                        <div style={{ width: "100%", display: "flex", justifyContent: "start", paddingLeft: '22px', justifyContent: 'space-between' }}>
                            <Resizable
                                size={{
                                    width: mcq.imageData.width,
                                    height: mcq.imageData.height
                                }}
                                maxWidth='100%'
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                lockAspectRatio={false}
                                onResizeStop={(e, d, ref, delta) => handleResize(e, d, ref, delta)}
                            >
                                <img src={URL.createObjectURL(mcq.imageData.image)} style={{ height: "100%", width: "100%" }}></img>
                            </Resizable>
                            <i style={{ cursor: 'pointer' }} onClick={handleDeleteImage} class="fa-regular fa-circle-xmark"></i>
                        </div>
                    ) : null}
                    <select style={{marginLeft:'22px', marginTop:'10px'}} onChange={handleSingleOrMultiple} value={mcq.type}>
                        <option value={"single"}>Single correct</option>
                        <option value={"multiple"}>Multiple correct</option>
                    </select>
                    {
                        mcq.type === "single" ? (
                            mcq.options.map((option, optionIndex) => {
                                return (
                                    <div key={optionIndex} style={{marginLeft:'22px', marginTop:'10px'}}>
                                        <input type="radio" value={option} name="radio" onChange={(e) => { saveCorrectAnswer(e, optionIndex) }} />
                                        <input type="text" placeholder={`option ${optionIndex + 1}`} value={option} onChange={(e) => { saveOption(e, optionIndex) }} style={{ width: '90%', border: 'none', outline: "none" }} />
                                        <i onClick={() => { deleteOption(optionIndex) }} style={{ cursor: "pointer" }} className="fa-regular fa-circle-xmark"></i>
                                    </div>
                                )
                            })) : (
                            mcq.options.map((option, optionIndex) => {
                                return (
                                    <div key={optionIndex} style={{marginLeft:'22px' , marginTop:'10px'}}>
                                        <input type="checkbox" value={option} checked={mcq.correctAnswer[`option${optionIndex}`]} disabled={!option} name="radio" onChange={(e) => { saveCorrectAnswer(e, optionIndex) }} />
                                        <input type="text" placeholder={`option ${optionIndex + 1}`} value={option} onChange={(e) => { saveOption(e, optionIndex) }} style={{ width: '90%', border: 'none',outline: "none" }} />
                                        <i onClick={() => { deleteOption(optionIndex) }} style={{ cursor: "pointer" }} className="fa-regular fa-circle-xmark"></i>
                                    </div>
                                )
                            }
                            ))
                    }
                    <button style={{marginLeft:'22px' , marginTop:'10px'}} onClick={addOption} className="add-option">Add Option</button>
                </div>

            }
        </>
    );
}

export default McqComponent;