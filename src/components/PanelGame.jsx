import "@/styles/components/PanelGame.css"

const PanelGame = () => {

    const formatQuestion = (q) => {
        const count_words = q.split(" ")
        const count_chars = q.length
        if(count_chars > 50){
            const charIndex50 = q[50]
            if(charIndex50 !== " "){
                let paragraph = ["",]
                for(let i = 0; i < count_words.length; i++){
                    const next_value = paragraph[paragraph.length -1] + count_words[i] + " "
                    if(next_value.length < 50){
                        paragraph[paragraph.length -1] = next_value
                    }else{
                        paragraph.push("")
                        paragraph[paragraph.length -1] = count_words[i] + " "
                    }
                }
                return paragraph
            }
        }else{
            return [].push(q)
        }
    }
    const pretext = "Lorem ipsum dolor, sit amet consectetur adipisicing"
    const text = formatQuestion(pretext)
    return(
        <div className="panel-game">
            <img src={"/images/modulo_panel.png"} className="module-panel" alt="Imagen del Panel"/>
            {text.map((textItem,key) =>(
                <p key={key}>{textItem}</p>
            ))}
        </div>
    )
}

export default PanelGame