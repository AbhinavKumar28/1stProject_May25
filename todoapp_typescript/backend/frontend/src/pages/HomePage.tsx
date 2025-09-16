import React from "react";
import "../assets/styles/styles.css";
import "../assets/images/arrow-right.png"
import images from '../constants/imagesImports.ts'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import type {JSX} from "react";
import type { Task,Category, ComponentProps } from '../types/components.d.ts';
import componentsImports from '../constants/componentsImports.ts';
import { useEffectToShowCategory } from "../hooks/useCategory.ts";

function HomePage({ tasks, setTasks }:ComponentProps):JSX.Element{
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
            console.log(response)
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
                                         
                <div className='categoryContainer'><span className='categoryHeading'>{td.category.toUpperCase()}</span><img onClick={() => navigate(`/list/${td.category}/todos`)} className='rightArrowButton' aria-hidden alt="" src={images.rightArrow} />
              </div>
                
           
                                        
                                    </React.Fragment>);
                            })
                    return a
    }
    useEffectToShowCategory(setCategories)    
    return (
    <>
        <div className='body'>
            <div className='inputContainer'>
                        <input  type="text" placeholder="Add Category..." className='inputElement' value={currentCategory} onChange={e=>setCurrentCategory(e.target.value)}/>

                        
                <button onClick={addCategory} className='addButton'>Add </button>
                <button onClick={() => navigate(`/login`)} className='addButton'>Login/Signup </button>
                
                    </div>
            
            <div className='list'>
                {renderCategories()}
                </div>
            {/* <form action="">
                <input type="text" />
                <button onSubmit={addCategory'></button>
            </form> */}
                    
            <componentsImports.AddNewNote tasks={tasks} setTasks={setTasks} id ="household"/>
            {/* <img className='} aria-hidden alt="" src="/Assets/arrow-right.png" /> */}
                                            
        </div>
    </>
    )
}
export default HomePage