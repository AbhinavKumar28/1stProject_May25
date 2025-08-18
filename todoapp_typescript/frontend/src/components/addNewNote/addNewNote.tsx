import styles from "./addNewNote.module.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
// import PropTypes from "prop-types";
import type { JSX } from "react";
// import Popy from "../PopUp/PopUp";
import { useState, useEffect } from "react";
import React from "react";
// import { ObjectId } from "mongodb";
type Task = {
    _id:string,
    todonote:string,
    category: string
}
type Category = {
    _id:string,
    category: string
}
type AddNewNoteProps = { tasks:Task[], setTasks:React.Dispatch<React.SetStateAction<Task[]>>}
function AddNewNote({ tasks, setTasks }:AddNewNoteProps):JSX.Element {

    // const  = this.props;

    //     const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState("");
    const [categories,setCategories]=useState<Category[]>([])
        
    const [currentCategory, setCurrentCategory] = useState("");
    // useEffect(() => {
    //     const showTask = async(): Promise<void> => {
    //         let data: Task[] = []
    //         try {
    //             const response= await fetch(`http://localhost:3005/todos`,{
    //                 method:"GET",
    //             });
    //             data = await response.json();
    //             console.log("hello",data);
    //             // return data
    //         }catch (err) {
    //             console.error('Error:', err);
    //             // return []
    //         }
    //         if (data) {
    //             setTasks(data);
    //         }
    //     }
    //     showTask()
    // }, []);
    const [selectedCategory,setSelectedCategory]=useState("")
    function handleCategoryChange(e:React.ChangeEvent<HTMLSelectElement>){
        setSelectedCategory(e.target.value.toLowerCase())
    }
        const renderCategories=():JSX.Element[]=>{
            const a:JSX.Element[]= categories.map((cate:Category):JSX.Element => {
                                    return (
                                        <React.Fragment key={JSON.stringify(cate._id)} >
            <option value={cate.category}>{cate.category.toUpperCase()}</option>
            </React.Fragment>);
                                        })
                                return a
                }
    const addTask = async():Promise<void> => {
        let data:Task = {} as Task
        let a :string=""
        try {
            const response= await fetch('http://localhost:3005/todosInsert',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({todonote:currentTask,category:selectedCategory})
            })
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
    }
    useEffect(()=>{
            const showCategory = async(): Promise<void> => {
                    let data: Task[] = []
                    try {
                        const response= await fetch(`http://localhost:3005/list/categories`,{
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
                        setCategories(data);
                    }
                }
                showCategory()
            
        },[])
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
                        <div className={styles.search}>
                            {/* <input type="text" placeholder="Input your category..." className={styles.searchNote} value={currentTask} onChange={e => setCurrentTask(e.target.value)}/> */}
                            <select name="cars" id="category" value = {selectedCategory} onChange={handleCategoryChange} className={styles.searchNote_1} aria-hidden >
                                <option value= "" disabled selected hidden>Input your category</option>
                               {renderCategories()}
                            </select>
                        
                        </div>
                        
                        {/* <div className={styles.content}>

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

                        </div> */}

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
