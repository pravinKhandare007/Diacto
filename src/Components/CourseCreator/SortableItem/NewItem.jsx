import React, { forwardRef } from 'react';

export const NewItem = forwardRef(({ children, ...props }, ref) => {
    return (
        <>
            <div {...props} ref={ref}>{children}</div>
        </>
    )
});