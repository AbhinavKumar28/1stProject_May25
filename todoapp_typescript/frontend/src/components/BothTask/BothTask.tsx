import EditIcon from "../EditIcon/EditIcon.tsx";
import styles from "./BothTask.module.css";
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
                                        <li className={styles.note}>

                                            <input type="checkbox" className={styles.noteChild} name="" id="" />
                                            <span className={styles.note1}>{td.todonote}</span>
                                            <span className={styles.options}>
                                                <EditIcon tasks={tasks} setTasks={setTasks} index={td._id} />
                                                <img className={styles.trashSvgrepoCom1Icon} aria-hidden onClick={() => removeTask(td._id)} alt="" src="/Assets/trash-svgrepo-com 1.svg" />
                                            </span>
                                            {/* <hr className={styles.noteDivider} /> */}
                                        </li>
                                        {/* {(index !== (tasks.length - 1)) && */}
                                        <hr className={styles.noteDivider} />
                                    </React.Fragment>);
                            })
                    return a
    }
    // const editTask = i => {

    // };

    // const  = this.props;

    return (
        <>
            <div className={styles.body}>
                {/* <img className={styles.addButtonIcon} alt="" src="Add button.svg" /> */}
                <div className={styles.list}>
                    <ul className="noteList">
                        {/* {(typeof tasks !== "undefined") && console.log(tasks)} */}
                        {(typeof tasks !== "undefined") &&
                            renderTodos()
                            }
                        
                        {/* {if (typeof tasks !== "undefined")
                        {tasks.map((eachItem, index) => {
                            return (
                                <div key={index} className={styles.note}>

                                    <input type="checkbox" className={styles.noteChild} name="" id="" />
                                    <span className={styles.note1}>{eachItem}</span>
                                    <span className={styles.options}>
                                        <EditIcon tasks={tasks} setTasks={setTasks} index={index} />
                                        <img className={styles.trashSvgrepoCom1Icon} aria-hidden onClick={() => removeTask(index)} alt="" src="/Assets/trash-svgrepo-com 1.svg" />
                                    </span>
                                </div>);
                        })}} */}
                    </ul>
                    {/* <div className={styles.note}>
                        <div className={styles.noteChild} />
                        <input type="checkbox" className={styles.noteChild} name="" id="" />
                        <div className={styles.note1}></div>
                        <div className={styles.options}>
                            <img className={styles.optionsChild} alt="" src="/Assets/Frame 6.svg" />
                            <img className={styles.trashSvgrepoCom1Icon} alt="" src="/Assets/trash-svgrepo-com 1.svg" />
                        </div>
                    </div>
                    <div className={styles.note2}>
                        <div className={styles.noteItem} />
                        <div className={styles.noteInner} />

                        <div className={styles.note}>
                            <div className={styles.noteChild} />
                            <input type="checkbox" className={styles.noteChild} name="" id="" />
                            <div className={styles.note1}>Note #1</div>
                            <div className={styles.options}>
                                <img className={styles.optionsChild} alt="" src="/Assets/Frame 6.svg" />
                                <img className={styles.trashSvgrepoCom1Icon} alt="" src="/Assets/trash-svgrepo-com 1.svg" />
                            </div> */}
                    {/* </div> */}
                    {/* <div className={styles.note31}>Note #2</div>
                        <div className={styles.options}>
                            <img className={styles.vectorIcon} alt="" src="Vector.svg" />
                            <img className={styles.trashSvgrepoCom1Icon} alt="" src="/Assets/trash-svgrepo-com 1.svg" />
                        </div> */}
                    {/* </div> */}

                    {/* <div className={styles.note}>

                        <input type="checkbox" className={styles.noteChild} name="" id="" />
                        <div className={styles.note1}>Note #1</div>
                        <div className={styles.options}>
                            <img className={styles.optionsChild} alt="" src="/Assets/Frame 6.svg" />
                            <img className={styles.trashSvgrepoCom1Icon} alt="" src="/Assets/trash-svgrepo-com 1.svg" />
                        </div>
                    </div>  */}
                    {/* <div className={styles.note3}>
                        <div className={styles.rectangleDiv} />
                        <div className={styles.note31}>Note #3</div>
                        <div className={styles.options}>
                            <img className={styles.vectorIcon} alt="" src="Vector.svg" />
                            <img className={styles.trashSvgrepoCom1Icon} alt="" src="/Assets/trash-svgrepo-com 1.svg" />
                        </div>
                    </div> */}
                    {/* <div className={styles.listChild} />
                    <div className={styles.listItem} /> */}
                </div>
            </div>
        </>
    );
}
// BothTasks.propTypes = {
//     tasks: PropTypes.array.isRequired, // or PropTypes.arrayOf(PropTypes.object)
//     setTasks: PropTypes.func.isRequired
// };
export default BothTasks;
