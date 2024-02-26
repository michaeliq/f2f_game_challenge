import "@/styles/components/ContainerGame.css"
import Time from "./Time"
const ContainerGame = ({children}) => {

    return(
        <div className="container-game">
            <img src={"/images/background_image.png"} className="background-img-game" alt="Imagen del ring"/>
            <img src={"/images/f2f_challenge_logo.png"} className="logo-img-game" alt="Imagen del logo"/>
            <Time/>
            {children}
        </div>
    )
}

export default ContainerGame