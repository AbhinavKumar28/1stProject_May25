import React from "react";

import styles from "./homeScreen.module.css";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom"
import type {JSX} from "react";
import AddNewNote from "../addNewNote/addNewNote";
type Task = {
    _id:string,
    todonote:string,
    category: "personal" | "work" | "household"
}
type Category = {
    _id:string,
    category: string
}
type AddNewNoteProps = { tasks:Task[], setTasks:React.Dispatch<React.SetStateAction<Task[]>>}
function HomeScreen({ tasks, setTasks }:AddNewNoteProps):JSX.Element{
    const [categories,setCategories]=useState<Category[]>([])
    const [currentCategory, setCurrentCategory] = useState<string>("");
    const navigate = useNavigate();
    const addCategory = async():Promise<void> => {
        let data:Category = {} as Category
        try {
            const response= await fetch('http://localhost:3005/categoriesInsert',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({category:currentCategory.toLowerCase()})
            });
            data = await response.json();
            console.log("hello",data);
        }catch (err) {
            console.error('Error:', err);
        }
        if (currentCategory !== "") {
            let updatedCategory:Category[] = [...categories, data];

            setCategories(updatedCategory);
            // localStorage.setItem("lists", JSON.stringify(updatedTask));
            setCurrentCategory("");
        }
}
    const renderCategories=():JSX.Element[]=>{
        const a:JSX.Element[]= categories.map((td:Category):JSX.Element => {
                                return (
                                    <React.Fragment key={JSON.stringify(td._id)} >
                                         
                <div className={styles.divMain}><span className={styles.spanMain}>{td.category.toUpperCase()}</span><img onClick={() => navigate(`/list/${td.category}/todos`)} className={styles.btnMain} aria-hidden alt="" src="/Assets/arrow-right.png" />
              </div>
                
           
                                        
                                    </React.Fragment>);
                            })
                    return a
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
    return (
    <>
        <div className={styles.body}>
            <div className={styles.search}>
                        <input  type="text" placeholder="Add Category..." className={styles.searchNote} value={currentCategory} onChange={e=>setCurrentCategory(e.target.value)}/>
{/* onChange={searchHandler} value={searchInput} */}
                        {/* <textarea className={styles.taskinput__textarea} name="Task-Input" id="task-input" required placeholder='Enter the task...'></textarea><input type="text" name="search-note" className={styles.searchNote} id="search-note" placeholder="Search note..."/> */}
                        
                <button onClick={addCategory} className={styles.button1}>Add </button>
                        {/* <img className={styles.vectorIcon} alt="" src="/Assets/Vector.svg" /> */}
                    </div>
            
            <div className={styles.list}>
                {renderCategories()}
                </div>
            {/* <form action="">
                <input type="text" />
                <button onSubmit={addCategory}></button>
            </form> */}
                    
            <AddNewNote tasks={tasks} setTasks={setTasks}/>
            {/* <img className={styles.} aria-hidden alt="" src="/Assets/arrow-right.png" /> */}
                                            
        </div>
    </>
    )
}
export default HomeScreen