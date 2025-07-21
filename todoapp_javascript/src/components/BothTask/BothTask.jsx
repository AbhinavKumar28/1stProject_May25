import EditIcon from "../EditIcon/EditIcon";
import styles from "./BothTask.module.css";
import PropTypes from "prop-types";
function BothTasks({ tasks, setTasks }) {

    // const editTask = i => {

    // };

    // const  = this.props;
    const removeTask = i => {
        const removedTask = tasks.filter((_, index) => index != i);

        setTasks(removedTask);
        localStorage.setItem("lists", JSON.stringify(removedTask));
    };

    return (
        <>
            <div className={styles.body}>
                {/* <img className={styles.addButtonIcon} alt="" src="Add button.svg" /> */}
                <div className={styles.list}>
                    <ul>
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
                        })}
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
BothTasks.propTypes = {
    tasks: PropTypes.array.isRequired, // or PropTypes.arrayOf(PropTypes.object)
    setTasks: PropTypes.func.isRequired
};
export default BothTasks;
