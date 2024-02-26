"use client"
import "@/styles/components/InitGame.css"
import JSConfetti from 'js-confetti'
import { useEffect, useState } from "react"
import Link from "next/link"

const InitGame = () => {
    const [gameStart, setStateGame] = useState(false)
    const [jsConfetti, setInstanceCJ] = useState(null)
    
    const InitGameAction = () => {
        setStateGame(prev => {
            if (!prev) {
                jsConfetti.addConfetti({
                    emojis: [
                        '🥮', '🟡'
                    ],
                })
            }
            return !prev
        })
    }

    useEffect(()=>{
        setInstanceCJ(new JSConfetti)
    },[])

    return (
        <div className="init-game">
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