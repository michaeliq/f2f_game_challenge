import "@/styles/components/OptionGame.css"

const OptionGame = ({children,src,classN,altText}) => {
    return(
        <div className={classN}>
            <img src={src} alt={altText}/>
            {children}
        </div>
    )
}

export default OptionGame