"use client"
import "@/styles/components/ContainerOptionsGame.css"
import OptionGame from "./OptionGame"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { useEffect, useState } from "react"
import JSConfetti from 'js-confetti'
import Swal from "sweetalert2"
import { updateQuestionN, updateRound, updateTime, updateTurn } from "@/redux/gameReducer"
import { incrementPoints } from "@/redux/userReducer"

const formatQuestion = (q) => {
    const count_words = q.split(" ")
    const count_chars = q.length
    if (count_chars > 50) {
        let paragraph = ["",]
        for (let i = 0; i < count_words.length; i++) {
            const next_value = paragraph[paragraph.length - 1] + count_words[i] + " "
            if (next_value.length < 50) {
                console.log(paragraph)
                paragraph[paragraph.length - 1] = next_value
            } else {
                console.log(paragraph)
                paragraph.push("")
                paragraph[paragraph.length - 1] = count_words[i] + " "
            }
        }
        console.log(paragraph)
        return paragraph
    } else {
        return [q]
    }
}

const ContainerOptionsGame = () => {
    const question = useAppSelector((state) => state.question)
    const game = useAppSelector((state) => state.game)
    const dispatch = useAppDispatch()
    const [jsConfetti, setInstanceCJ] = useState(null)
    const [options, setOptions] = useState([])

    const optionsGameItem = [
        { classN: "module-option a", src: "/images/modulo_opcion_a.png", altText: "Imagen de la opción a" },
        { classN: "module-option b", src: "/images/modulo_opcion_b.png", altText: "Imagen de la opción b" },
        { classN: "module-option c", src: "/images/modulo_opcion_c.png", altText: "Imagen de la opción c" },
        { classN: "module-option d", src: "/images/modulo_opcion_d.png", altText: "Imagen de la opción d" },
    ]

    const verifyAnswer = (text) => {
        const option_selected = text
        if(game.paused){
            Swal.fire({
                title:"Advertencia",
                text:"No puedes responder preguntas mientras estés en una pausa",
                icon:"warning"
            })

            return
        }
        if (option_selected === question.answer) {
            celebration()
            if(game.turn === "A"){
                dispatch(incrementPoints({
                    points:10,
                    group:"A"
                }))
            }else{
                dispatch(incrementPoints({
                    points:10,
                    group:"B"
                }))
            }
        } else {
            incorrectAnswer()
        }
    }

    const celebration = () => {
        jsConfetti.addConfetti({
            emojis: [
                '🥮', '🟡'
            ],
        })

        Swal.fire({
            title:"Respuesta correcta",
            icon:"success",
            backdrop:false
        }).then(()=>{
            dispatch(updateQuestionN())
            dispatch(updateRound())
        })
    }

    const incorrectAnswer = () => {
        Swal.fire({
            title:"Respuesta incorrecta",
            icon:"error",
            backdrop:false
        })
        jsConfetti.addConfetti({
            emojis: [
                '😭', '😢'
            ],
        })
        dispatch(updateTurn())
        if(game.turn === "B"){
            dispatch(updateQuestionN())
            dispatch(updateRound())
        }
    }

    useEffect(() => {
        setInstanceCJ(new JSConfetti)
        setOptions(question.options)
    }, [question])


    return (
        <div className="container-options-game">
            {options.length > 0 && optionsGameItem.map((option, key) => (
                <OptionGame verifyAnswer={verifyAnswer} text={options[key]} key={key} src={option.src} classN={option.classN} altText={option.altText}>
                    {formatQuestion(options[key]).map(text => (
                        <p>{text}</p>
                    ))}
                </OptionGame>
            ))}
        </div>
    )
}

export default ContainerOptionsGame