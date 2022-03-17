import './Puzzle-page.styles.css'

import Puzzle from "../../components/puzzle/Puzzle.component"
import Message from '../../components/message/Message.component'
import QuestionSection from "../../components/question-section/Question-section.component"

import { useSelector } from 'react-redux'
import { selectGame } from '../../redux/game/game.selectors'

const PuzzlePage = () => {
    const game = useSelector(selectGame);

    return (
        <div id="puzzle-page">
            {game.showMessage ?
                <Message />:
                null
        }
            <QuestionSection></QuestionSection>
            <Puzzle></Puzzle>
        </div>
    )
}

export default PuzzlePage