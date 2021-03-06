import './Question.styles.css'

const Question = ({children}) => {
  return (
    <div>
        <h4 className='question-title'>Choose the right option</h4>
        <h2 className='question'> {children}</h2>
    </div>
  )
}

export default Question