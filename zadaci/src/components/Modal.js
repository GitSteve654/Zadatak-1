import classes from "./Modal.module.css";
import {useRef} from "react";

function Modal(props){
    let currDate = new Date()
    let currMonth = JSON.stringify(currDate.getMonth()+1).padStart(2,"0");
    let currDay = JSON.stringify(currDate.getDate()).padStart(2,"0");
    let minDate = currDate.getFullYear()+"-"+currMonth+"-"+currDay;

    let selectValue;
    if(props.list[props.id].priority === 0) selectValue = "nizak";
    else if(props.list[props.id].priority === 1) selectValue = "srednji";
    else selectValue = "visok";

    let newDesc = useRef();
    let newDate = useRef();
    let newTitle = useRef();
    let newPriority = useRef();
    function SubmitChange(){
        let newData = {
            newPriority:newPriority.current.value,
            newTitle:newTitle.current.value,
            newDate:newDate.current.value,
            newDesc:newDesc.current.value,
            id:props.id
        }
        props.saveF(newData);
    }

    return(
        <div className={classes.modalHolder}>
            <div className={classes.modalMask} onClick={()=>{props.modalF(-1)}}></div>
            <div className={classes.modalWindow}>
                <div className={classes.modalRow}>
                    <div className={classes.modalTitle}>Naziv</div>
                    <div className={classes.modalValueHolder}>
                        <input type="text" maxLength="100" defaultValue={props.list[props.id].title} ref={newTitle}></input>
                    </div>
                </div>
                <div className={classes.modalRow}>
                    <div className={classes.modalTitle}>Opis</div>
                    <div className={classes.modalValueHolder}>
                        <input type="text" maxLength="100" defaultValue={props.list[props.id].desc} ref={newDesc}></input>
                    </div>
                </div>
                <div className={classes.modalRow}>
                    <div className={classes.modalTitle}>Rok Predaje</div>
                    <div className={classes.modalValueHolder}>
                        <input type="date" min={minDate} defaultValue={props.list[props.id].due} ref={newDate}></input>
                    </div>
                </div>
                <div className={classes.modalRow}>
                    <div className={classes.modalTitle}>Prioritet</div>
                    <div className={classes.modalValueHolder}>
                        <select defaultValue={selectValue} ref={newPriority}>
                            <option value="nizak">Nizak</option>
                            <option value="srednji">Srednji</option>
                            <option value="visok">Visok</option>
                        </select>
                    </div>
                </div>
                <div className={classes.modalRow}>
                    <div className={classes.modalButton} onClick={SubmitChange}>Sacuvaj</div>
                    <div className={classes.modalButton} onClick={()=>{props.modalF(-1)}}>Izadji</div>
                </div>
            </div>
        </div>
    );
}

export default Modal;