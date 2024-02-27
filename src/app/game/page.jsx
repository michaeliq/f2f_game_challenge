import PanelQuestionGame from "@/components/PanelQuestionGame"
import { createTables, initTables } from "./services.bd"

const GamePage = () => {

    const createRegisterGame = async () => {
        try {
            /* createTables() */
            /* initTables() */

        } catch (error) {
            console.error(error)
        }
    }

    createRegisterGame()

    return (
        <PanelQuestionGame />
    )
}

export default GamePage