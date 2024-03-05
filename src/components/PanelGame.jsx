"use client"
import "@/styles/components/PanelGame.css"
import QuestionGame from "./QuestionGame"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { changeDataQuestion, resetQuestion } from "@/redux/questionReducer"
import Swal from "sweetalert2"
import { resetUserValues } from "@/redux/userReducer"
import { resetValues, updateWinner } from "@/redux/gameReducer"

const formatQuestion = (q) => {
    if(!q) return
    const count_words = q.split(" ")
    const count_chars = q.length
    if (count_chars > 50) {
        let paragraph = ["",]
        for (let i = 0; i < count_words.length; i++) {
            const next_value = paragraph[paragraph.length - 1] + count_words[i] + " "
            if (next_value.length < 50) {
                paragraph[paragraph.length - 1] = next_value
            } else {
                paragraph.push("")
                paragraph[paragraph.length - 1] = count_words[i] + " "
            }
        }
        return paragraph
    } else {
        return [q]
    }
}



const PanelGame = () => {

    const [questionBody, setQuestionBody] = useState([])
    const game = useAppSelector((state) => state.game)
    const user = useAppSelector((state) => state.user)
    const [roundGame, setRoundGame] = useState(0)
    const dispatch = useAppDispatch()
    const router = useRouter()



    const getNextQuestion = async () => {
        try {
            const questionID = game.questionIdsByGame[game.questionNumber - 1]
            const question = await fetch("/game/question?id=" + questionID, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const raw = await question.json()

            if (game.gameFinished) {
                let winner
                let text
                if (user.groupA.points > user.groupB.points) {
                    winner = user.groupA
                    text = "Grupo A"
                    dispatch(updateWinner("A"))
                } else {
                    winner = user.groupB
                    text = "Grupo B"
                    dispatch(updateWinner("B"))
                }

                const queryResult = await fetch("/game/result",{
                    headers:{
                        "Content-Type":"application/json"
                    },
                    method:"POST",
                    body:JSON.stringify({
                        category:game.category?.id,
                        total_points:winner.points,
                        total_time:winner.time,
                        groups:`Grupo A: ${user.groupA.user1} - ${user.groupA.user2} // Grupo B: ${user.groupB.user1} - ${user.groupB.user2}`,
                        winner:`${winner.user1},${winner.user2}`
                    })
                })

                const dataResult = await queryResult.json()

                Swal.fire({
                    title: "El juego ha terminado",
                    text: "El ganador es " + text,
                    icon: "success",
                    customClass: {
                        container:"custom-container"
                      },
                }).then(() => {
                    dispatch(resetUserValues())
                    dispatch(resetQuestion())
                    dispatch(resetValues())
                    router.push("/")
                })

                return
            }

            const text = formatQuestion(raw.question_body)
            setQuestionBody(text)

            dispatch(changeDataQuestion({
                answer: raw.answer,
                questionBody: raw.question_body,
                options: raw.options.split(",").sort()
            }))

            setRoundGame(game.round)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getNextQuestion()
    }, [])

    useEffect(() => {
        if (game.round !== roundGame) {
            getNextQuestion()
        }
    }, [game.round])

    return (
        <div className="panel-game">
            
            <img src={"/images/modulo_panel.png"} className="module-panel" alt="Imagen del Panel" />
            {questionBody?.map((textItem, key) => (
                <p key={key}>{textItem}</p>
            ))}
            <QuestionGame />
        </div>
    )
}

export default PanelGame