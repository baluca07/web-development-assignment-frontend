export default function HomeButton(){
    return(
        <div className={`buttonContainer`}>
            <button onClick={()=>window.location.href = "../"}>Go Back Home</button>
        </div>
    )
}