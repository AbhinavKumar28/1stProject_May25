import styles from "./addNewNote.module.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
// import PropTypes from "prop-types";
import type { JSX } from "react";
// import Popy from "../PopUp/PopUp";
import { useState, useEffect } from "react";
type AddNewNoteProps = { tasks:string[], setTasks:React.Dispatch<React.SetStateAction<string[]>>}
function AddNewNote({ tasks, setTasks }:AddNewNoteProps):JSX.Element {

    // const  = this.props;

    //     const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState("");

    useEffect(() => {
        const storedItem:string | null = localStorage.getItem("lists");

        if (storedItem) {
            setTasks(JSON.parse(storedItem));
        }

        // localStorage.clear();
    }, []);
    const addTask = ():void => {
        if (currentTask !== "") {
            let updatedTask:string[] = [...tasks, currentTask];

            setTasks(updatedTask);
            localStorage.setItem("lists", JSON.stringify(updatedTask));
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
