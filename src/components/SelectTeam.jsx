"use client"

const { useState, useEffect } = require("react")
import { changePausedStateGame, selectTeam } from "@/redux/gameReducer"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import "@/styles/components/SelectTeam.css"

const SelectTeam = () => {
    const [teamIsSelected, setTeam] = useState(false)
    const dispatch = useAppDispatch()
    const game = useAppSelector(state => state.game)

    const handleSelectTeam = (team) => {
        dispatch(selectTeam(team))
        dispatch(changePausedStateGame({paused:false}))
        setTeam(true) 
    }

    useEffect(() => {
        setTeam(false)
        dispatch(changePausedStateGame({paused:true}))
    }, [game.round])

    return (
        <>
            {!teamIsSelected && !game.gameFinished &&
                <div className={"select_team_game_container "}>
                    <div onClick={() => handleSelectTeam("A")} className="module-team-a">
                        <img src={"/images/menu_opt_background.png"} className="select_team_game image" alt="equipo a" />
                        <p className="team-a">Equipo A</p>
                    </div>
                    <div onClick={() => handleSelectTeam("B")} className="module-team-b">
                        <img src={"/images/menu_opt_background.png"} className="select_team_game image" alt="equipo b" />
                        <p className="team-b">Equipo B</p>
                    </div>
                </div>
            }
        </>
    )
}

export default SelectTeam