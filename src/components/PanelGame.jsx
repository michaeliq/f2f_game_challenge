"use client"
import "@/styles/components/PanelGame.css"
import QuestionGame from "./QuestionGame"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { changeDataQuestion, resetQuestion } from "@/redux/questionReducer"
import Swal from "sweetalert2"
import { resetUserValues } from "@/redux/userReducer"
import { resetValues } from "@/redux/gameReducer"

const formatQuestion = (q) => {
    const count_words = q.split(" ")
    const count_chars = q.length
    if(count_chars > 50){
        const charIndex50 = q[50]
        if(charIndex50 !== " "){
            let paragraph = ["",]
            for(let i = 0; i < count_words.length; i++){
                const next_value = paragraph[paragraph.length -1] + count_words[i] + " "
                if(next_value.length < 50){
                    paragraph[paragraph.length -1] = next_value
                }else{
                    paragraph.push("")
                    paragraph[paragraph.length -1] = count_words[i] + " "
                }
            }
            return paragraph
        }
    }else{
        return [q]
    }
}



const PanelGame = () => {

    const [questionBody,setQuestionBody] = useState([])
    const game = useAppSelector((state)=>state.game)
    const user = useAppSelector((state)=>state.user)
    const [roundGame, setRoundGame] = useState(0)
    const dispatch = useAppDispatch()
    const router = useRouter()

    

    const getNextQuestion = async () => {
        try {
            const question = await fetch("/game/question?id="+ game?.questionNumber,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })

            const raw = await question.json()

            if(raw.error){
                let winner
                if(user.groupA.points > user.groupB.points){
                    winner = "Grupo A"
                }else{
                    winner = "Grupo B"
                }
                Swal.fire({
                    title:"El juego ha terminado",
                    text:"El ganador es " + winner,
                    icon:"success"
                }).then(()=>{
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
                answer:raw.answer,
                questionBody:raw.question_body,
                options:raw.options.split(",").sort()
            }))

            setRoundGame(game.round)
            
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        getNextQuestion()
    },[])

    useEffect(()=>{
        if(game.round !== roundGame){
            getNextQuestion()
        }
    },[game.round])

    return(
        <div className="panel-game">
            <img src={"/images/modulo_panel.png"} className="module-panel" alt="Imagen del Panel"/>
            {questionBody?.map((textItem,key) =>(
                <p key={key}>{textItem}</p>
            ))}
            <QuestionGame/>
        </div>
    )
}

export default PanelGame