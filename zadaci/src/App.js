import ToDo from "./components/ToDo";
import {useState} from "react";

function App(){
    let toDos = [];

    let [list, setList] = useState(toDos);
    function newToDo(){
        let date = new Date();
        let day = JSON.stringify(date.getDate()).padStart(2,"0");
        let month = JSON.stringify(date.getMonth()+1).padStart(2,"0");
        let dateString = day+"/"+month+"/"+date.getFullYear();
        let newToDo = {id:list.length, title:"Naziv", desc:"Opis", due:dateString, priority:0, done:false};
        setList([...list,newToDo]);
    }
    return(
        <div className="appHolder">
            <div className="appHead">
                <div className="headerTitle">Zadaci</div>
                <div className="headerButtonHolder">
                    <div className="roundButton headerButton" onClick={newToDo}></div>
                </div>
            </div>
            <div className="appBody">
                <div className="toDoHolder">
                    {!list.length && <div className="noToDos">Nemate nijedan zadatak!</div>}
                    {list.map((toDo)=>{
                        return <ToDo key={toDo.id} data={toDo}/>;
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;