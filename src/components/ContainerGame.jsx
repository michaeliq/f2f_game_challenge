"use client"
import "@/styles/components/ContainerGame.css"
import Time from "./Time"
import SelectTeam from "./SelectTeam"
import CelebrateTeam from "./CelebrateTeam"
import { useAppSelector } from "@/redux/hooks"
const ContainerGame = ({children}) => {
    const game = useAppSelector((state) => state.game)

    return(
        <div className="container-game">
            {game.gameFinished && game.winner && <CelebrateTeam winner={game?.winner}/>}
            <img src={"/images/background_image.png"} className="background-img-game" alt="Imagen del ring"/>
            <img src={"/images/f2f_challenge_logo.png"} className="logo-img-game" alt="Imagen del logo"/>
            <Time/>
            <SelectTeam />
            {children}
        </div>
    )
}

export default ContainerGame