import CompatitorGame from "./CompatitiorGame"

import "@/styles/components/ContainerCompatitorGame.css"
import PointsGame from "./PointsGame"

const ContainerCompatitorGame = () => {
    return (
        <div className="container-compatitor-game">
            <CompatitorGame axisX={"right"} axisY={"Top"} altText={"Competidor 1 equipo A"}>
                <p>Jugador 1</p>
            </CompatitorGame>
            <CompatitorGame axisX={"left"} axisY={"Top"} alt="Competidor 1 equipo B">
                <p>Jugador 2</p>
            </CompatitorGame>
            <CompatitorGame axisX={"right"} axisY={"Bottom"} alt="Competidor2 equipo A">
                <p>Jugador 3</p>
            </CompatitorGame>
            <CompatitorGame axisX={"left"} axisY={"Bottom"} alt="Competidor 2 equipo B" >
                <p>Jugador 4</p>
            </CompatitorGame>
            <PointsGame/>
        </div>
    )
}

export default ContainerCompatitorGame