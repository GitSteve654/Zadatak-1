import classes from "./ToDo.module.css";
import CheckMark from "./CheckMark";

function ToDo(props){
    let priorityColors = ["rgb(0,200,50)","rgb(250,230,0)","rgb(250,0,0)"];
    let style = {backgroundColor:priorityColors[props.data.priority]};

    let startTime, endTime;
    function moveStart(){
        startTime = new Date();
    }
    function moveChange(e){
        if(startTime){
            endTime = new Date();
            if(endTime - startTime >= 150){
                props.showMoving(props.data);
                let x = e.clientX, y = e.clientY;
                let touch = e.changedTouches;
                if(touch){
                    x = touch[0].pageX;
                    y = touch[0].pageY;
                }
                
                let toDoHeight = window.innerHeight*0.14;
                let toDoWidth = Math.min(window.innerHeight*0.6,window.innerWidth-window.innerHeight*0.04)+window.innerHeight*0.04;
                let newPosY = Math.floor((y-window.innerHeight*0.1)/toDoHeight);
                let newPosX = Math.floor(x/toDoWidth);
                let maxX = Math.floor(window.innerWidth/toDoWidth);
                let maxY = Math.round(props.list.length/maxX);
                if(newPosX >= 0 && newPosX < maxX && newPosY >= 0 && newPosY < maxY){
                    let newPos = newPosY*maxX+newPosX;
                    if(newPos >= props.list.length) newPos = props.list.length-1;
                    arrayMove(props.list,props.data.id,newPos);
                    for(let i = 0; i < props.list.length; i++) props.list[i].id = i;
                    props.list[newPos].selected = true;
                    props.setList([...props.list]);
                }
            }
        }
    }
    function moveEnd(){
        if(startTime){
            props.list[props.data.id].selected = false;
            props.setList([...props.list]);
            props.showMoving(null);
            startTime = null;
            localStorage.setItem("toDos",JSON.stringify([...props.list]));
        }
    }
    function arrayMove(array, fromIndex, toIndex) {
        let element = array[fromIndex];
        array.splice(fromIndex,1);
        array.splice(toIndex,0,element);
    }
    function deleteToDo(){
        props.list.splice(props.data.id,1);
        for(let i = props.data.id; i < props.list.length; i++) props.list[i].id = i;
        props.setList([...props.list]);
        localStorage.setItem("toDos",JSON.stringify(props.list));
    }
    function checkBox(){
        if(!props.list[props.data.id].done) props.list[props.data.id].done = true;
        else props.list[props.data.id].done = false;
        props.setList([...props.list]);
        localStorage.setItem("toDos",JSON.stringify([...props.list]));
    }
   
    let hideToDo = {display:"flex"};
    if(props.data.selected && !props.special) hideToDo = {display:"none"};
    window.addEventListener("mousemove",moveChange);
    window.addEventListener("touchmove",moveChange);
    window.addEventListener("touchend",moveEnd);
    window.addEventListener("mouseup",moveEnd);
    
    return(
        <div className={classes.toDoHolder}>
            <div className={classes.toDo} style={hideToDo} onMouseDown={moveStart} onTouchStart={moveStart}>
                <div className={classes.checkHolder}>
                    <div className={classes.checkBox} onClick={checkBox}>
                        {props.data.done && <CheckMark/>}
                    </div>
                </div>
                <div className={classes.mainWrapper} onClick={()=>{
                    if(!startTime || (startTime && endTime && (endTime - startTime < 150)))
                        props.modalF(props.data.id)
                    }}>
                    <div className={classes.mainHolder}>
                        <div className={classes.mainHead}>{props.data.title}</div>
                        <div className={classes.mainBody}>{props.data.desc}</div>
                    </div>
                    <div className={classes.toDoDataHolder}>
                        <div className={classes.toDoDataRow}>{props.data.due}</div>
                        <div className={classes.toDoDataRow}>
                            <div className={classes.priority} style={style}></div>
                        </div>
                    </div>
                </div>  
                <div className={classes.deleteButtonHolder}>
                    <div className="roundButton deleteButton" onClick={deleteToDo}></div>
                </div>
            </div>
        </div>
    );
}

export default ToDo;