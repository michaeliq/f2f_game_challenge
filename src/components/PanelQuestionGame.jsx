import "@/styles/components/PanelQuestionGame.css"
import ContainerCompatitorGame from "./ContainerCompatitor"
import ContainerOptionsGame from "./ContainerOptionsGame"
import PanelGame from "./PanelGame"
import ReturnButton from "./ReturnButton"
const PanelQuestionGame = () => {
    return(
        <div className="panel-question-game">
            <ReturnButton />
            <PanelGame/>
            <ContainerOptionsGame/>
            <ContainerCompatitorGame/>
        </div>
    )
}

export default PanelQuestionGame