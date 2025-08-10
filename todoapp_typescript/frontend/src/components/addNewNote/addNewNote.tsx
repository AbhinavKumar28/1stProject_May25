import styles from "./addNewNote.module.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
// import PropTypes from "prop-types";
import type { JSX } from "react";
// import Popy from "../PopUp/PopUp";
import { useState, useEffect } from "react";
// import { ObjectId } from "mongodb";
type Task = {
    _id:string,
    todonote:string
}
type AddNewNoteProps = { tasks:Task[], setTasks:React.Dispatch<React.SetStateAction<Task[]>>}
function AddNewNote({ tasks, setTasks }:AddNewNoteProps):JSX.Element {

    // const  = this.props;

    //     const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState("");
    const [currentCategory, setCurrentCategory] = useState("");
    const categoryToggle=(category:string):any=>{
        let element=document.getElementById("Household")
        let element1=document.getElementById("Personal")
        let element2=document.getElementById("Work")
        if (category==="Household"){
            element=document.getElementById("Household")
            element1=document.getElementById("Personal")
            element2=document.getElementById("Work")
            
        }else if(category==="Work"){
            element=document.getElementById("Work")
            element1=document.getElementById("Personal")
            element2=document.getElementById("Household")
            
        }else{
            element=document.getElementById("Personal")
            element1=document.getElementById("Work")
            element2=document.getElementById("Household")
            
        }         
        if (element){                       
        element.classList.remove(styles.button)
                                        
                                        element.classList.add(styles.button2)
                                        if (element1 && element2){
                                        element1.classList.remove(styles.button2)
                                        element2.classList.remove(styles.button2)
                                        
                                        element1.classList.add(styles.button)
                                        element2.classList.add(styles.button)
                    
                                        }}}
    useEffect(() => {
        const showTask = async(): Promise<void> => {
            let data: Task[] = []
            try {
                const response= await fetch(`http://localhost:3005/todos`,{
                    method:"GET",
                });
                data = await response.json();
                console.log("hello",data);
                // return data
            }catch (err) {
                console.error('Error:', err);
                // return []
            }
            if (data) {
                setTasks(data);
            }
        }
        showTask()
    }, []);
    const addTask = async():Promise<void> => {
        let data:Task = {} as Task
        try {
            const response= await fetch('http://localhost:3005/todosInsert',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({todonote:currentTask})
            });
            data = await response.json();
            console.log("hello",data);
        }catch (err) {
            console.error('Error:', err);
        }
        if (currentTask !== "") {
            let updatedTask:Task[] = [...tasks, data];

            setTasks(updatedTask);
            // localStorage.setItem("lists", JSON.stringify(updatedTask));
            setCurrentTask("");
        }
    };

    //     const imagePopup = () => {
    //         Popy();
    //     };

    return (
        <>
            <Popup
                trigger={
                    <img className={styles.addButtonIcon} aria-hidden alt="" src="/Assets/Add button.svg" />
                }
                modal

                contentStyle={{ padding: "0px", border: "1px solid white", borderRadius: "5px" }}

                // contentClassName="my-custom-content"
                // overlayClassName="my-custom-overlay"
                nested
            >
                {close => (
                    <div className={styles.modal}>
                        {/* <button className="close" onClick={close}>
                      &times;
                        </button> */}
                        {/* <div className="header"> Modal Title </div> */}
                        <div className={styles.newNoteHeading}><h1>New Note</h1>
                        </div>
                        <div className={styles.search}>
                            <input type="text" placeholder="Input your note..." className={styles.searchNote} value={currentTask} onChange={e => setCurrentTask(e.target.value)}/>

                        </div>
                        
                        <div className={styles.content}>

                            <button
                                id="Household"
                                className={styles.button}
                                onClick={() => {
                                    categoryToggle("Household")
                                    
                                }}
                            >
                        Household
                            </button>
                            <button
                                id="Work"
                                className={styles.button}
                                onClick={() => {
                                    categoryToggle("Work")
                                    
                                }}
                            >
                        Work
                            </button>
                            <button
                                id="Personal"
                                className={styles.button}
                                onClick={() => {
                                    categoryToggle("Personal")
                                    
                                }}
                            >
                        Personal
                            </button>

                        </div>

                        <div className={styles.content}>

                            <button

                                className={styles.button}
                                onClick={() => {
                                    console.log("modal closed ");
                                    close();
                                }}
                            >
                        Cancel
                            </button>

                            <button

                                className={styles.button1}
                                onClick={addTask}

                                // style={{ marginLeft: "auto" }}
                            >
                        Apply
                            </button>
                        </div>

                    </div>
                )}
            </Popup>


        </>
    );
}

// AddNewNote.propTypes = {
//     tasks: PropTypes.array.isRequired, // or PropTypes.arrayOf(PropTypes.object)
//     setTasks: PropTypes.func.isRequired
// };
export default AddNewNote;
