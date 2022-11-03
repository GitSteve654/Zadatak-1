import classes from "./CheckMark.module.css";

function CheckMark(){
    return(
        <div className={classes.checkMark}>
            <div className={classes.checkSmall}><div className={classes.checkSmallBar}></div></div>
            <div className={classes.checkBig}><div className={classes.checkBigBar}></div></div>
        </div>
    );
}

export default CheckMark;