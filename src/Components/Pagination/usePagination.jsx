import { useMemo } from "react";

function range( start , end , numbersArray){
    const arr = [];
    for(let i = start - 1 ; i <= end - 1 ; i++ ){
        arr.push(numbersArray[i]);
    }
    return arr;
}

export const usePagination = ({
    slidesArray,
    siblingCount = 1,
    currentSlideId
  }) => {
    const paginationRange = useMemo(() => {

        let numbersArray = slidesArray.map((slide , index )=>{
            return {
                id : slide.id,
                number: index + 1
            }
        })


      const totalSlideCount = numbersArray.length ;
  
      // Pages count is determined as siblingCount + firstPage + lastPage + currentSlideNumber + 2*"DOTS"
      const totalBoxes = siblingCount + 5;
  
      /*
        Case 1:
        If the number of pages is less than the page numbers we want to show in our
        paginationComponent, we return the range [1..totalSlideCount]
      */
      if (totalBoxes >= totalSlideCount) {
        return range(1, totalSlideCount , numbersArray);
      }


      const currentSlideNumber = numbersArray.findIndex((slide)=> currentSlideId === slide.id) + 1;
      /*
          Calculate left and right sibling index and make sure they are within range 1 and totalSlideCount
      */
      const leftSiblingIndex = Math.max(currentSlideNumber - siblingCount, 1);
      const rightSiblingIndex = Math.min(
        currentSlideNumber + siblingCount,
        totalSlideCount
      );
  
      /*
        We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalSlideCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalSlideCount - 2
      */
      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalSlideCount - 2;
  
      const firstPageIndex = 1;
      const lastPageIndex = totalSlideCount;
  
      /*
          Case 2: No left dots to show, but rights dots to be shown
      */
      if (!shouldShowLeftDots && shouldShowRightDots) {
        let leftItemCount = 3 + 2 * siblingCount;
        let leftRange = range(1, leftItemCount ,numbersArray);
  
        return [...leftRange, "DOTS", numbersArray[totalSlideCount - 1]];
      }
  
      /*
          Case 3: No right dots to show, but left dots to be shown
      */
      if (shouldShowLeftDots && !shouldShowRightDots) {
        
        let rightItemCount = 3 + 2 * siblingCount;
        let rightRange = range(
          totalSlideCount - rightItemCount + 1,
          totalSlideCount , numbersArray
        );
        return [numbersArray[firstPageIndex - 1], "DOTS", ...rightRange];
      }
       
      /*
          Case 4: Both left and right dots to be shown
      */
      if (shouldShowLeftDots && shouldShowRightDots) {
        let middleRange = range(leftSiblingIndex, rightSiblingIndex , numbersArray);
        return [numbersArray[firstPageIndex - 1], "DOTS", ...middleRange, "DOTS", numbersArray[totalSlideCount - 1]];
      }
    }, [slidesArray, siblingCount, currentSlideId]);
  
    return paginationRange;
  };