"use client"
import "@/styles/components/OptionGame.css"

const OptionGame = ({children,src,classN,altText,verifyAnswer,text}) => {
    return(
        <div onClick={()=>verifyAnswer(text)} className={classN}>
            <img src={src} alt={altText}/>
            {children}
        </div>
    )
}

export default OptionGame