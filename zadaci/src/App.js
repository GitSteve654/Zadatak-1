function App(){
    return(
        <div className="app-holder">
            <div className="app-head">
                <div className="header-title">Zadaci</div>
                <div className="header-button-holder">
                    <div className="header-button remove-button" onClick={()=>{console.log("nije zavrseno")}}></div>
                    <div className="header-button add-button" onClick={()=>{console.log("nije zavrseno")}}></div>
                </div>
            </div>
            <div className="app-body">
        
            </div>
        </div>
    );
}

export default App;