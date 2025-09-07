import EditIcon from "./EditIcon.tsx";
import "../styles/styles.css";

import '../Assets/trash-svgrepo-com-1.svg';
// import PropTypes from "prop-types";
import React from "react";
import type {JSX} from "react";
// import { ObjectId } from "mongodb";
type Task = {
  _id: string;
  todonote: string;
  category: string
};
type BothTasksProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

function BothTasks({ tasks, setTasks }:BothTasksProps):JSX.Element {
    const removeTask = async (i:string):Promise<void> => {
        const removedTask:Task[] = tasks.filter((task:Task):boolean => task._id !== i);

        setTasks(removedTask);
        // localStorage.setItem("lists", JSON.stringify(removedTask));
        try {
            const response= await fetch(`http://localhost:3005/todos/${i}`,{
                method:"DELETE"
            });
            const data = await response.text();
            console.log("hello",data);
        }catch (err) {
            console.error('Error:', err);
        }
    };
    const renderTodos=():JSX.Element[]=>{
        const a:JSX.Element[]= tasks.map((td:Task):JSX.Element => {
                                return (
                                    <React.Fragment key={JSON.stringify(td._id)} >
                                        <li className='noteList'>

                                            <input type="checkbox" className='noteCheckbox' name="" id="" />
                                            <span className='noteText'>{td.todonote}</span>
                                            <span className='editDeleteContainer'>
                                                <EditIcon tasks={tasks} setTasks={setTasks} index={td._id} />
                                                <img className='trashIcon' aria-hidden onClick={() => removeTask(td._id)} alt="" src="/Assets/trash-svgrepo-com-1.svg" />
                                            </span>
                                            
                                        </li>
                                        
                                        <hr className='noteDivider' />
                                    </React.Fragment>);
                            })
                    return a
    }

    return (
        <>
            <div className='body'>
                <div className='listContainer'>
                    <ul className="noteListContainer">
                        {(typeof tasks !== "undefined") &&
                            renderTodos()
                            }
                        
                    </ul>
                </div>
            </div>
        </>
    );
}
export default BothTasks;
