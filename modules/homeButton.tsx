export default function HomeButton(){
    return(
        <div className={`buttonContainer`}>
            <button onClick={()=>window.location.href = "../"}>Go to home page</button>
        </div>
    )
}