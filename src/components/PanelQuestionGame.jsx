import "@/styles/components/PanelQuestionGame.css"
import ContainerCompatitorGame from "./ContainerCompatitor"
import ContainerOptionsGame from "./ContainerOptionsGame"
import PanelGame from "./PanelGame"
import QuestionGame from "./QuestionGame"
const PanelQuestionGame = () => {
    return(
        <div className="panel-question-game">
            <PanelGame/>
            <QuestionGame/>
            <ContainerOptionsGame/>
            <ContainerCompatitorGame/>
        </div>
    )
}

export default PanelQuestionGame