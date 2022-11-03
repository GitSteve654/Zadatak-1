import {useState} from "react";
import ToDo from "./ToDo";

function MovingToDo(props){
    let currId = props.data.id;
    let toDoHeight = window.innerHeight*0.14;
    let toDoWidth = Math.min(window.innerHeight*0.6,window.innerWidth-window.innerHeight*0.04)+window.innerHeight*0.04;
    let maxX = Math.floor(window.innerWidth/toDoWidth);
    let defaultY = Math.floor(currId/maxX)*toDoHeight+toDoHeight/2+window.innerHeight*0.1;
    let defaultX = (currId-maxX*defaultY)*toDoWidth+toDoWidth/2;

    let [coords, updatePos] = useState([defaultX,defaultY]);
    window.addEventListener("mousemove",move);
    window.addEventListener("touchmove",move);
    function move(e){
        let x = e.clientX;
        let y = e.clientY;
        let touch = e.changedTouches;
        if(touch){
            x = touch[0].pageX;
            y = touch[0].pageY;
        }
        updatePos([x,y]);
    }
    let data = {};
    if(props) data = props.data;

    return(
        <div style={{position:"absolute",transform:"translate(-50%,-50%)",left:coords[0],top:coords[1],zIndex:10}}>
            <ToDo special={true} modalF={null} list={[]} key={0} data={data}/>
        </div>
    );
}

export default MovingToDo;