import React, {forwardRef} from 'react';

export const Item = forwardRef(({id, ...props}, ref) => {
  return (
    <>
      <div className='single_slide_container' {...props} ref={ref}>{props.children}</div>
    </>
  )
});