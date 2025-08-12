import styles from "./EditIcon.module.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
// import PropTypes from "prop-types";
import type {JSX} from "react";
// import Popy from "../PopUp/PopUp";
import { useState, useEffect } from "react";
import { string } from "joi";
// import type { ObjectId } from "mongodb";
type Task = {
    _id: string,
    todonote: string,
    category: "personal" | "work" | "household" 
}
type category = "personal" | "work" | "household"
type EditIconProps = {tasks:Task[], setTasks:React.Dispatch<React.SetStateAction<Task[]>>, index:string}
function EditIcon({ tasks, setTasks, index }:EditIconProps):JSX.Element {

    // const  = this.props;

    //     const [tasks, setTasks] = useState([]);
    const foundTask = tasks.find(item=>item._id===index)
    const [currentTask, setCurrentTask] = useState<string>(foundTask?foundTask.todonote:"");
    // const [currentTask, setCurrentTask] = useState("");
    // const [currentCategory, setCurrentCategory] = useState<string>(foundTask?foundTask.todonote:"");
    const [currentCategory, setCurrentCategory] = useState<category>(foundTask?foundTask.category:"household");
    useEffect(()=>{
        categoryToggle(currentCategory)
    });
    const categoryToggle=(category:string):any=>{
        let element=document.getElementById("Household")
        let element1=document.getElementById("Personal")
        let element2=document.getElementById("Work")
        if (category==="household"){
            element=document.getElementById("Household")
            element1=document.getElementById("Personal")
            element2=document.getElementById("Work")
            setCurrentCategory("household")
        }else if(category==="work"){
            element=document.getElementById("Work")
            element1=document.getElementById("Personal")
            element2=document.getElementById("Household")
            setCurrentCategory("work")
        }else{
            element=document.getElementById("Personal")
            element1=document.getElementById("Work")
            element2=document.getElementById("Household")
            setCurrentCategory("personal")
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
    
    // useEffect(() => {
    //         const showTask = async(): Promise<void> => {
    //             let data: Task[] = []
    //             try {
    //                 const response= await fetch(`http://localhost:3005/todos`,{
    //                     method:"GET",
    //                 });
    //                 data = await response.json();
    //                 console.log("hello",data);
    //                 // return data
    //             }catch (err) {
    //                 console.error('Error:', err);
    //                 // return []
    //             }
    //             if (data) {
    //                 setTasks(data);
    //             }
    //         }
    //         showTask()
    //     }, []);
        
    const editTask = async():Promise<void> => {
        try {
            const response= await fetch(`http://localhost:3005/todos/${index}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({todonote:currentTask,category:currentCategory.toLowerCase()})
            });
            const data = await response.text();
            console.log("hello",data);
        }catch (err) {
            console.error('Error:', err);
        }
        // console.log(typeof (index));
        const updatedArray:Task[] = tasks.map((item:Task):Task => {
            if (item._id === index) {
                
                return { ...item, todonote: currentTask,category:currentCategory}; 
            }
            return item; 
        }); 
        // updatedTask[index] = currentTask;
        setTasks(updatedArray);
        // localStorage.setItem("lists", JSON.stringify(updatedTask));

        setCurrentTask("");
        setCurrentCategory("household");
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
                                id="Household"
                                className={styles.button}
                                onClick={() => {
                                    categoryToggle("household")
                                    
                                }}
                            >
                        Household
                            </button>
                            <button
                                id="Work"
                                className={styles.button}
                                onClick={() => {
                                    categoryToggle("work")
                                    
                                }}
                            >
                        Work
                            </button>
                            <button
                                id="Personal"
                                className={styles.button}
                                onClick={() => {
                                    categoryToggle("personal")
                                    
                                }}
                            >
                        Personal
                            </button>

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

// EditIcon.propTypes = {
//     tasks: PropTypes.array.isRequired, // or PropTypes.arrayOf(PropTypes.object)
//     setTasks: PropTypes.func.isRequired,
//     index: PropTypes.number.isRequired
// };
export default EditIcon;
