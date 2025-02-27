"use client"
import "@/styles/components/Time.css"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { updateTime, changePausedStateGame, updateRound, updateTurn, updateQuestionN } from "@/redux/gameReducer"
import { useEffect, useState } from "react"

const Time = () => {
    const game = useAppSelector((state) => state.game)
    const dispatch = useAppDispatch()
    const [gamePaused, setPausedState] = useState(false)
    const [interval, setStatusInterval] = useState(undefined)
    const [time, setTime] = useState(30)

    const changePausedState = () => {
        setPausedState(prev => {
            dispatch(changePausedStateGame({paused:!prev}))
            return !prev
        })
        clearInterval(interval)
    }

    useEffect(() => {
        if (game.paused) {
            setPausedState(game.paused)
            setTime(game.time)
        }
    }, [])

    useEffect(()=>{
        if(!game.paused){
            setTime(30)
            dispatch(updateTime({time:30}))
        }
    },[game.turn,game.round])

    useEffect(() => {
        let intervalI
        if (!gamePaused && !game.gameFinished) {
            intervalI = setInterval(() => {
                setTime(time - 1)
                dispatch(updateTime({time}))
            }, 1000);
            setStatusInterval(intervalI)
        }
        if (time <= 0 && !game.gameFinished) {
            clearInterval(intervalI)
            if(game.countTurn === 2){
                dispatch(updateTurn())
            }else{
                dispatch(updateRound())
                dispatch(updateQuestionN())
            }
        }
        return () => clearInterval(intervalI)
    }, [time, gamePaused])


    return (
        <div className="time-box">
            <img src={"/images/modulo_tiempo.png"} className="time-module" alt="Imagen caja de cuenta regresiva" />
            <p>00:{time < 10 ? "0" : ""}{time}</p>

            <div onClick={changePausedState} className="time-pause">
                <span>{gamePaused ? "CONTINUAR" : "PAUSAR"}</span>
            </div>
        </div>
    )
}

export default Time