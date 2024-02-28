"use client"
import "@/styles/components/InitGame.css"
import { useEffect, useState } from "react"
import { changeStateGame, resetValues } from "@/redux/gameReducer"
import JSConfetti from 'js-confetti'
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { resetQuestion } from "@/redux/questionReducer"
import { resetUserValues } from "@/redux/userReducer"

const InitGame = () => {
    const [gameStart, setStateGame] = useState(false)
    const [jsConfetti, setInstanceCJ] = useState(null)
    const game = useAppSelector((state) => state.game)
    const dispatch = useAppDispatch()

    const InitGameAction = () => {
        setStateGame(prev => {
            if (!prev) {
                jsConfetti.addConfetti({
                    emojis: [
                        '🥮', '🟡'
                    ],
                })
                dispatch(changeStateGame({
                    stateGame: !prev
                }))
            } else {
                dispatch(resetValues())
                dispatch(resetQuestion())
                dispatch(resetUserValues())
            }

            return !prev
        })
    }

    useEffect(() => {
        setInstanceCJ(new JSConfetti)
        if (game.gameState) {
            setStateGame(game.gameState)
        }
    }, [])

    return (
        <div className="init-game">
            <img src="/images/game_background_init.png" alt="Logo de juego" className="init-game-logo" />
            <div className="init-game-container-buttons">
                {gameStart ?
                    <ul className="init-game-options">
                        <Link href={"/game"}>
                            <li className="init-game-option">
                                Comenzar
                            </li>
                        </Link>
                        <li className="init-game-option">Ver Ranking</li>
                        <li className="init-game-option">Ver Categorías</li>
                        <li className="init-game-option">Actualizar Base de Jugadores</li>
                        <li className="init-game-option">Actualizar Base de Preguntas</li>
                        <li onClick={InitGameAction} className="init-game-option">Salir</li>
                    </ul> : <ul className="init-game-option-start">
                        <li onClick={InitGameAction} className="init-game-start-btn">
                            INICIAR JUEGO
                        </li>
                    </ul>
                }
            </div>
        </div>
    )
}

export default InitGame