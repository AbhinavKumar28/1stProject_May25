import styles from "./EditIcon.module.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import PropTypes from "prop-types";

// import Popy from "../PopUp/PopUp";
import { useState, useEffect } from "react";
function EditIcon({ tasks, setTasks, index }) {

    // const  = this.props;

    //     const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(tasks[index]);

    useEffect(() => {
        const storedItem = localStorage.getItem("lists");

        if (storedItem) {
            setTasks(JSON.parse(storedItem));
        }

        // localStorage.clear();
    }, []);
    const editTask = () => {
        let updatedTask = [...tasks];

        // console.log(typeof (index));
        updatedTask[index] = currentTask;
        setTasks(updatedTask);
        localStorage.setItem("lists", JSON.stringify(updatedTask));

        // setCurrentTask("");

        // close();
    };

    //     const imagePopup = () => {
    //         Popy();
    //     };

    return (
        <>
            <Popup
                trigger={
                    <img className={styles.optionsChild} alt="" aria-hidden src="/Assets/Frame 6.svg" />
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

                                    // console.log("modal closed ");
                                    close();
                                }}
                            >
                        Cancel
                            </button>

                            <button

                                className={styles.button1}
                                onClick={() => {

                                    // console.log("modal closed ");
                                    editTask();
                                    close();
                                }}

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

EditIcon.propTypes = {
    tasks: PropTypes.array.isRequired, // or PropTypes.arrayOf(PropTypes.object)
    setTasks: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
};
export default EditIcon;
