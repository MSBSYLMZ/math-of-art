import './Default-button.styles.css'
import { forwardRef } from 'react'

const DefaultButton = forwardRef(({ children, ...otherProps }, ref) => {
  return (
    <button {...otherProps} ref={ref} className='default-button'>{children}</button>
  )
});

export default DefaultButton