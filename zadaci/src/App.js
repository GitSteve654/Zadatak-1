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

    function newToDo(){
        let date = new Date();
        let day = JSON.stringify(date.getDate()).padStart(2,"0");
        let month = JSON.stringify(date.getMonth()+1).padStart(2,"0");
        let dateString = day+"/"+month+"/"+date.getFullYear();
        let newToDo = {id:list.length, title:"Naziv", desc:"Opis", due:dateString, priority:0, done:false};
        localStorage.setItem("toDos",JSON.stringify([...list,newToDo]));
        setList([...list,newToDo]);
    }
    function checkBox(list,id){
        if(!list[id].done) list[id].done = true;
        else list[id].done = false;
        localStorage.setItem("toDos",JSON.stringify([...list]));
        setList([...list]);
    }
    function deleteToDo(list,id){
        list.splice(id,1);
        for(let i = id; i < list.length; i++) list[i].id = i;
        setList([...list]);
    }
    function openModal(id){
        if(showModal != -1) showChange(-1);
        else showChange(id);
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
                        return <ToDo modalF={openModal} checkF={checkBox} deleteF={deleteToDo} list={list} key={toDo.id} data={toDo}/>;
                    })}
                </div>
            </div>
            {showModal != -1 && <Modal modalF={openModal} list={list} id={showModal}/>}
        </div>
    );
}

export default App;