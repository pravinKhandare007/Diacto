import { usePagination } from "./usePagination";

const Pagination = ({ slides, paginate, currentSlideId, setCurrentSlideId }) => {

    const paginationRange = usePagination({
        slidesArray: slides,
        currentSlideId: currentSlideId,
        siblingCount: 1
    })


    // const numbers = slides.map((slide , index)=>{
    //     return {
    //         id:slide.id ,
    //         number:++index
    //     }
    // })
    function nextSlide() {
        //[{id}{id}{id}]
        const currentSlideIndex = slides.findIndex((slide) => slide.id === currentSlideId);
        setCurrentSlideId(slides[currentSlideIndex + 1].id);
    }

    function previousSlide() {
        const currentSlideIndex = slides.findIndex(slide => slide.id === currentSlideId);
        setCurrentSlideId(slides[currentSlideIndex - 1].id);
    }

    const disableStyle = {
        pointerEvents: "none",
        color: "grey"
    }

    function disableNext() {
        if (currentSlideId === slides[slides.length - 1].id) return disableStyle;
        return {}
    }

    function disablePrevious() {
        if (currentSlideId === slides[0].id) return disableStyle;
        return {}
    }

    return (<>
        <nav className="d-flex justify-content-center align-items-center">
            <ul className="pagination">
                <li className={`page-item`} style={disablePrevious()}><a onClick={previousSlide} className="page-link">{"<"}</a></li>
                {
                    paginationRange.map((element) => {
                        if (element === "DOTS") {
                            return (
                                <li className={`page-item`}><a className="page-link">&#8230;</a></li>
                            )
                        }
                        return (
                            <li key={element.id} className={`page-item`}>
                                <a onClick={() => paginate(element.id)} className={`page-link ${currentSlideId === element.id && "pagination-color text-white"}`}>{element.number}</a>
                            </li>
                        )
                    })
                }
                <li className={`page-item`} style={disableNext()}><a onClick={nextSlide} className="page-link">{">"}</a></li>
            </ul>
        </nav>
    </>);
}

export default Pagination;