"use client"
import "@/styles/components/QuestionViewer.css"
import { useEffect, useState } from "react"


const QuestionViewer = ({ setVisibility, visibility }) => {
    const [questionList, setQuestionList] = useState([])

    const categories = [
        "Biometria y LIOs Nivel 1",
        "Equipos Nivel 1",
        "Biometria y LIOs Nivel 2",
        "Equipos Nivel 2",
    ]

    const getAllQuestion = async () => {
        try {
            const queryQuestions = await fetch("/game/question", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const dataQuestion = await queryQuestions.json()

            setQuestionList(dataQuestion)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getAllQuestion()
    }, [visibility])

    return (
        <div className="question-viewer-container">
            <div className="question-viewer-content">
                <table className="question-viewer-list">
                    <thead>
                        <tr className="question-viewer-item">
                            <th className="question-viewer-cell">
                                Pregunta
                            </th>
                            <th className="question-viewer-cell">
                                Respuesta
                            </th>
                            <th className="question-viewer-cell">
                                Opciones
                            </th>
                            <th className="question-viewer-cell">
                                Módulo
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionList.map((question, key) => (
                            <tr key={key} className="question-viewer-item">
                                <th className="question-viewer-cell">
                                    {question.question_body}
                                </th>
                                <th className="question-viewer-cell">
                                    {question.answer}
                                </th>
                                <th className="question-viewer-cell">
                                    {question.options}
                                </th>
                                <th className="question-viewer-cell">
                                    {categories[question.category - 1]}
                                </th>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            <div className="question-viewer-container-btn">
                <button
                    onClick={() => {
                        setVisibility(prev => !prev)
                    }}
                    className="question-view-btn-confirm">
                    Salir
                </button>
            </div>
        </div>
    )
}

export default QuestionViewer