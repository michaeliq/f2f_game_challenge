"use client"
import { useAppSelector } from "@/redux/hooks"
import "@/styles/components/QuestionGame.css"

const QuestionGame = () => {
    const game = useAppSelector(state => state.game)
    return (
        <div className="question-game">
            <img src={"/images/modulo_pregunta.png"} className="module-question" alt="Imagen de la pregunta" />
            <p>Pregunta #{game.questionNumber}</p>
        </div>
    )
}

export default QuestionGame