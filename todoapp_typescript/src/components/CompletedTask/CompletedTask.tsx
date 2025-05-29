import styles from './CompletedTask.module.css';
function CompletedTasks(){ 
    return (
        <>
            <p className={styles.completed_task_heading}>
                Completed Tasks
            </p>
            <div style={{maxHeight: 200, overflow: 'auto'}}>
                <div>
                    <label className={styles.label}>
                        <input
                            type="checkbox"
                            checked={true}
                            className={styles.checkbox}
                        // onChange={handleCheckboxChange}
                        />
                        Subscribe to newsletter
                    </label>
                    <button className={styles.button}>
                        delete
                    </button>
                </div>
                <div>
                    <label className={styles.label}>
                        <input
                            type="checkbox"
                            checked={true}
                            className={styles.checkbox}
                        // onChange={handleCheckboxChange}
                        />
                        Subscribe to newsletter
                    </label>
                    <button className={styles.button}>
                        delete
                    </button>
                </div>
                <div>
                    <label className={styles.label}>
                        <input
                            type="checkbox"
                            checked={true}
                            className={styles.checkbox}
                        // onChange={handleCheckboxChange}
                        />
                        Subscribe to newsletter
                    </label>
                    <button className={styles.button}>
                        delete
                    </button>
                </div>
                <div>
                    <label className={styles.label}>
                        <input
                            type="checkbox"
                            checked={true}
                            className={styles.checkbox}
                        // onChange={handleCheckboxChange}
                        />
                        Subscribe to newsletter
                    </label>
                    <button className={styles.button}>
                        delete
                    </button>
                </div>
                <div>
                    <label className={styles.label}>
                        <input
                            type="checkbox"
                            checked={true}
                            className={styles.checkbox}
                        // onChange={handleCheckboxChange}
                        />
                        Subscribe to newsletter
                    </label>
                    <button className={styles.button}>
                        delete
                    </button>
                </div>
                <div>
                    <label className={styles.label}>
                        <input
                            type="checkbox"
                            checked={true}
                            className={styles.checkbox}
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
export default CompletedTasks