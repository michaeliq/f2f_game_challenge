"use client"
import "@/styles/components/InitGame.css"
import { useEffect, useState } from "react"
import { changeStateGame, resetValues } from "@/redux/gameReducer"
import JSConfetti from 'js-confetti'
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { resetQuestion } from "@/redux/questionReducer"
import { resetUserValues } from "@/redux/userReducer"
import SelectCategory from "./SelectCategory"
import QuestionViewer from "./QuestionViewer"
import RankingViewer from "./RankingViewer"
import CategoryViewer from "./CategoryViewer"
import UserViewer from "./UserViewer"
import CreateUser from "./CreateUser"

const InitGame = () => {
    const [gameStart, setStateGame] = useState(false)
    const [jsConfetti, setInstanceCJ] = useState(null)
    const [categoriesVisible, setVisibilityCategories] = useState(false)
    const [QuestionVisible, setVisibilityQuestions] = useState(false)
    const [RankingVisible, setRankingVisibility] = useState(false)
    const [UserListVisible, setUserListVisibility] = useState(false)
    const [UserFormVisible, setUserFormVisibility] = useState(false)
    const game = useAppSelector((state) => state.game)
    const dispatch = useAppDispatch()

    const InitGameAction = () => {
        setStateGame(prev => {
            if (!prev) {
                jsConfetti.addConfetti({
                    emojis: [
                        '💰', '🟡'
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

    const showCategories = () => {
        setVisibilityCategories(prev => !prev)
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
                    <>
                        {categoriesVisible && <SelectCategory setVisibility={setVisibilityCategories} />}
                        {QuestionVisible && <QuestionViewer visibility={QuestionVisible} setVisibility={setVisibilityQuestions} />}
                        {RankingVisible && <RankingViewer visibility={RankingVisible} setVisibility={setRankingVisibility} />}
                        {UserListVisible && <UserViewer visibility={UserListVisible} setVisibility={setUserListVisibility} />}
                        {UserFormVisible && <CreateUser visibility={UserFormVisible} setVisibility={setUserFormVisibility} />}
                        <ul className="init-game-options">
                            <li onClick={() => showCategories()} className="init-game-option">
                                Comenzar
                            </li>
                            <li onClick={() => setRankingVisibility(prev => !prev)} className="init-game-option">
                                Ver Ranking
                            </li>
                            <li onClick={() => setUserFormVisibility(prev => !prev)} className="init-game-option">
                                Inscribir Jugadores
                            </li>
                            <li onClick={() => { setUserListVisibility(prev => !prev) }} className="init-game-option">
                                Base de Jugadores
                            </li>
                            <li onClick={() => setVisibilityQuestions(prev => !prev)} className="init-game-option">
                                Base de Preguntas
                            </li>
                            <li onClick={InitGameAction} className="init-game-option">Salir</li>
                        </ul>
                    </>
                    : <ul className="init-game-option-start">
                        <li onClick={InitGameAction} className="init-game-start-btn">
                            INICIAR COMBATE
                        </li>
                    </ul>
                }
            </div>
        </div>
    )
}

export default InitGame