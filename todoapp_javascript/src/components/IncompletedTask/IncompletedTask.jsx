import styles from './IncompletedTask.module.css';
function IncompletedTasks(){ 
    return (
        <>
            <p className={styles.incompleted_task_heading}>
                Incompleted Tasks
            </p>
            <div style={{maxHeight: 200, overflow: 'auto'}}>    
                <div >
                    <label>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                        // checked={isChecked}
                        // onChange={handleCheckboxChange}
                        />
                        Subscribe to newsletter
                    </label>
                    <button className={styles.button}>
                        delete
                    </button>
                    
                </div>
                <div >
                    <label>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                        // checked={isChecked}
                        // onChange={handleCheckboxChange}
                        />
                        Subscribe to newsletter
                    </label>
                    <button className={styles.button}>
                        delete
                    </button>
                    
                </div>
                <div >
                    <label>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                        // checked={isChecked}
                        // onChange={handleCheckboxChange}
                        />
                        Subscribe to newsletter
                    </label>
                    <button className={styles.button}>
                        delete
                    </button>
                    
                </div>
                <div >
                    <label>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                        // checked={isChecked}
                        // onChange={handleCheckboxChange}
                        />
                        Subscribe to newsletter
                    </label>
                    <button className={styles.button}>
                        delete
                    </button>
                    
                </div>
                <div >
                    <label>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                        // checked={isChecked}
                        // onChange={handleCheckboxChange}
                        />
                        Subscribe to newsletter
                    </label>
                    <button className={styles.button}>
                        delete
                    </button>
                    
                </div>
                <div >
                    <label>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                        // checked={isChecked}
                        // onChange={handleCheckboxChange}
                        />
                        Subscribe to newsletter
                    </label>
                    <button className={styles.button}>
                        delete
                    </button>
                    
                </div>
            </div>
        </>
    )
}
// console.log(styles.incompleted-task-heading)
export default IncompletedTasks