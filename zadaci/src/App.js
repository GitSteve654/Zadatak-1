import MovingToDo from "./components/MovingToDo";
import Modal from "./components/Modal";
import ToDo from "./components/ToDo";
import {useState} from "react";

function App(){
    let toDos = [];
    try{
        toDos = JSON.parse(localStorage.getItem("toDos"));
        if(!toDos){
            toDos = [];
            localStorage.setItem("toDos",JSON.stringify(toDos));
        }
    }
    catch{
        toDos = [];
        localStorage.setItem("toDos",JSON.stringify(toDos));
    }
    let [list, setList] = useState(toDos);
    let [showModal, showChange] = useState(-1);
    let [showMovingData, showMovingToDo] = useState(null);

    function newToDo(){
        let date = new Date();
        let day = JSON.stringify(date.getDate()).padStart(2,"0");
        let month = JSON.stringify(date.getMonth()+1).padStart(2,"0");
        let dateString = date.getFullYear()+"-"+month+"-"+day;
        let newToDo = {id:list.length, title:"Naziv", desc:"Opis", due:dateString, priority:0, done:false, selected:false};
        setList([...list,newToDo]);
        localStorage.setItem("toDos",JSON.stringify([...list,newToDo]));
    }
    function openModal(id){
        if(showModal !== -1) showChange(-1);
        else showChange(id);
    }
    function saveChange(data){
        let newPriority;
        if(data.newPriority === "nizak") newPriority = 0;
        else if(data.newPriority === "srednji") newPriority = 1;
        else newPriority = 2;

        list[data.id].priority = newPriority;
        list[data.id].title = data.newTitle;
        list[data.id].desc = data.newDesc;
        list[data.id].due = data.newDate;

        showChange(-1);
        setList([...list]);
        localStorage.setItem("toDos",JSON.stringify([...list]));
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
                        return <ToDo 
                            showMoving={showMovingToDo}
                            modalF={openModal} 
                            setList={setList}
                            special={false}
                            key={toDo.id} 
                            list={list} 
                            data={toDo}
                        />;
                    })}
                </div>
            </div>
            {showModal !== -1 && <Modal saveF={saveChange} modalF={openModal} list={list} id={showModal}/>}
            {showMovingData && <MovingToDo data={showMovingData}/>}
        </div>
    );
}

export default App;