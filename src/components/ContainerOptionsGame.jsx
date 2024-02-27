"use client"
import "@/styles/components/ContainerOptionsGame.css"
import OptionGame from "./OptionGame"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { useEffect, useState } from "react"
import JSConfetti from 'js-confetti'
import Swal from "sweetalert2"
import { updateQuestionN, updateTime, updateTurn } from "@/redux/gameReducer"

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
            dispatch(updateTurn())
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
    }

    useEffect(() => {
        setInstanceCJ(new JSConfetti)
        setOptions(question.options)
    }, [question])


    return (
        <div className="container-options-game">
            {options.length > 0 && optionsGameItem.map((option, key) => (
                <OptionGame verifyAnswer={verifyAnswer} text={options[key]} key={key} src={option.src} classN={option.classN} altText={option.altText}>
                    <p>{options[key]}</p>
                </OptionGame>
            ))}
        </div>
    )
}

export default ContainerOptionsGame