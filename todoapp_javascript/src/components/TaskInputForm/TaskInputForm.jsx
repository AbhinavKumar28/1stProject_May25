import styles from './TaskInputForm.module.css';
function TaskInputForm() {
  return (
    <>
        <form>
          <div className={styles.form_container}>
            <label htmlFor="task-input" >Enter a task:</label>
            <textarea className={styles.taskinput__textarea} name="Task-Input" id="task-input" required placeholder='Enter the task...'></textarea>
          </div>
          <div className={styles.form_container}>
            <button className={styles.taskinput__submitbutton}>SUBMIT</button>
          </div>
        
      </form>
    </>
  );
}
// console.log(styles.card)
export default TaskInputForm;
