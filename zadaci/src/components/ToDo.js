import classes from "./ToDo.module.css";
import CheckMark from "./CheckMark";

function ToDo(props){
    let priorityColors = ["rgb(0,200,50)","rgb(250,230,0)","rgb(250,0,0)"];
    let style = {backgroundColor:priorityColors[props.data.priority]}
    return(
        <div className={classes.toDo}>
            <div className={classes.checkHolder}>
                <div className={classes.checkBox}>
                    <CheckMark/>
                </div>
            </div>
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
            <div className={classes.deleteButtonHolder}>
                <div className="roundButton deleteButton"></div>
            </div>
        </div>
    );
}

export default ToDo;