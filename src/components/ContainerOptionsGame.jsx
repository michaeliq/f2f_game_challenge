import "@/styles/components/ContainerOptionsGame.css"
import OptionGame from "./OptionGame"

const ContainerOptionsGame = () => {
    const optionsGameItem = [
        { classN: "module-option a", src: "/images/modulo_opcion_a.png", altText: "Imagen de la opción a" },
        { classN: "module-option b", src: "/images/modulo_opcion_b.png", altText: "Imagen de la opción b" },
        { classN: "module-option c", src: "/images/modulo_opcion_c.png", altText: "Imagen de la opción c" },
        { classN: "module-option d", src: "/images/modulo_opcion_d.png", altText: "Imagen de la opción d" },
    ]

    const textOptions = [
        "gatkja dlakjdljadlkj",
        "kjskldjalkjdljasd aklsdjaslkjdlkasndlk",
        "jdlkjaldna dkanjsdkjsa dkjasndkjasbda",
        "kjsdhakhdka hdajhsd"
    ]


    return (
        <div className="container-options-game">
            {optionsGameItem.map((option,key) => (
                <OptionGame key={key} src={option.src} classN={option.classN} altText={option.altText}>
                    <p>{textOptions[key]}</p>
                </OptionGame>
            ))}
        </div>
    )
}

export default ContainerOptionsGame