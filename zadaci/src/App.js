import ToDo from "./components/ToDo";

let toDos = [
    {id:0,title:"Naziv 1",desc:"Ovo je nekakav opis prvog zadatka blablablabla",due:"11/03/2022",priority:0,done:false},
    {id:1,title:"Naziv 2",desc:"Opis 2",due:"11/03/2022",priority:1,done:false},
    {id:2,title:"Naziv 3",desc:"Opis 3",due:"11/03/2022",priority:2,done:true},
    {id:3,title:"Naziv 4",desc:"Opis 4",due:"11/03/2022",priority:0,done:false},
    {id:4,title:"Naziv 5",desc:"Opis 5",due:"11/03/2022",priority:0,done:false},
    {id:6,title:"Naziv 6",desc:"Opis 6",due:"11/03/2022",priority:2,done:false}
];

function App(){
    return(
        <div className="appHolder">
            <div className="appHead">
                <div className="headerTitle">Zadaci</div>
                <div className="headerButtonHolder">
                    <div className="roundButton headerButton" onClick={()=>{console.log("nije zavrseno")}}></div>
                </div>
            </div>
            <div className="appBody">
                <div className="toDoHolder">
                    {toDos.map((toDo)=>{
                        return <ToDo key={toDo.id} data={toDo}/>;
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;