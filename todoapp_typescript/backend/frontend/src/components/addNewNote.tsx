import "../assets/styles/styles.css";
import images from '../constants/imagesImports.ts'
import Popup from "reactjs-popup";
import type { JSX } from "react";
import type { Task,Category, ComponentProps } from '../types/components.d.ts';
import { useState, useEffect } from "react";
import React from "react";
import { useEffectToShowCategory } from "../hooks/useCategory.ts";
function AddNewNote({ tasks, setTasks }:ComponentProps):JSX.Element {
    const [currentTask, setCurrentTask] = useState("");
    const [categories,setCategories]=useState<Category[]>([])
    const [selectedCategory,setSelectedCategory]=useState("")
    function handleCategoryChange(e:React.ChangeEvent<HTMLSelectElement>){
        setSelectedCategory(e.target.value.toLowerCase())
    }
        const renderCategories=():JSX.Element[]=>{
            const categoryElements:JSX.Element[]= categories.map((cate:Category):JSX.Element => {
                                    return (
                                        <React.Fragment key={JSON.stringify(cate._id)} >
            <option value={cate.category}>{cate.category.toUpperCase()}</option>
            </React.Fragment>);
                                        })
                                return categoryElements
                }
    const addTask = async():Promise<void> => {
        let data:Task = {} as Task
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
            setCurrentTask("");
        }
    }
    useEffectToShowCategory(setCategories)
    return (
        <>
            <Popup
                trigger={
                    <img className="addButtonIcon" aria-hidden alt="" src={images.addButton} />
                }
                modal

                nested
            >
                {close => (
                    <div className="modal">
                        <div className='newNoteHeading'><h1 >New Note</h1>
                        </div>
                        <div className='inputContainer'>
                            <input type="text" placeholder="Input your note..." className='inputElement' value={currentTask} onChange={e => setCurrentTask(e.target.value)}/>

                        </div>
                        <div className='inputContainer'>
                            <select name="cars" id="category" value = {selectedCategory} onChange={handleCategoryChange} className='inputElement' aria-hidden >
                                <option value= "" disabled selected hidden>Input your category</option>
                               {renderCategories()}
                            </select>
                        
                        </div>
                        
                        
                        <div className='buttonContainer'>

                            <button

                                className='closeButton'
                                onClick={() => {
                                    console.log("modal closed ");
                                    close();
                                }}
                            >
                        Cancel
                            </button>

                            <button

                                className='addButton'
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
export default AddNewNote;
