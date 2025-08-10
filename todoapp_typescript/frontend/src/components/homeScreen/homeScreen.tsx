import React from "react";

import styles from "./homeScreen.module.css";
import { useState, useEffect } from "react";

import type {JSX} from "react";
import AddNewNote from "../addNewNote/addNewNote";
type Task = {
    _id:string,
    todonote:string
}
type AddNewNoteProps = { tasks:Task[], setTasks:React.Dispatch<React.SetStateAction<Task[]>>}
function HomeScreen({ tasks, setTasks }:AddNewNoteProps):JSX.Element{
    return (
    <>
        <div className={styles.body}>
            <div className={styles.list}>
                <div className={styles.divMain}><span className={styles.spanMain}>All</span><img className={styles.btnMain} aria-hidden alt="" src="/Assets/arrow-right.png" />
              </div>
                <div className={styles.divMain}><span className={styles.spanMain}>Household</span><img className={styles.btnMain} aria-hidden alt="" src="/Assets/arrow-right.png" /></div>
                <div className={styles.divMain}><span className={styles.spanMain}>Work</span><img className={styles.btnMain} aria-hidden alt="" src="/Assets/arrow-right.png" /></div>
                <div className={styles.divMain}><span className={styles.spanMain}>Personal</span><img className={styles.btnMain} aria-hidden alt="" src="/Assets/arrow-right.png" /></div>
            </div>
            <AddNewNote tasks={tasks} setTasks={setTasks}/>
            {/* <img className={styles.} aria-hidden alt="" src="/Assets/arrow-right.png" /> */}
                                            
        </div>
    </>
    )
}
export default HomeScreen