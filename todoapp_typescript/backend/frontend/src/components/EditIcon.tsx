import "../assets/styles/styles.css";
import images from '../constants/imagesImports.ts'
import Popup from "reactjs-popup";
import type {JSX} from "react";
import { useState, useEffect } from "react";
import React from "react";
import type { Task,Category, EditIconProps } from '../types/components.d.ts';
type category = string
function EditIcon({ tasks, setTasks, index }:EditIconProps):JSX.Element {
    const foundTask = tasks.find(item=>item._id===index)
    const [currentTask, setCurrentTask] = useState<string>(foundTask?foundTask.todonote:"");
    const [currentCategory, setCurrentCategory] = useState<category>(foundTask?foundTask.category:"household");
    const [categories,setCategories]=useState<Category[]>([])
    const [selectedCategory,setSelectedCategory]=useState("")
        function handleCategoryChange(e:React.ChangeEvent<HTMLSelectElement>){
            setSelectedCategory(e.target.value.toLowerCase())
            setCurrentCategory(e.target.value.toLowerCase())
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
            <Popup
                trigger={
                    <img alt="" aria-hidden src={images.edit} />
                }
                modal

                nested
            >
                {close => (
                    <div className="modal">
                        <div className='newNoteHeading'><h1>New Note</h1>
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
                       
                        
                        <div className='content'> 

                            <button

                                className='closeButton'
                                onClick={() => {

                                    // console.log("modal closed ");
                                    close();
                                }}
                            >
                        Cancel
                            </button>

                            <button

                                className='addButton'
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
