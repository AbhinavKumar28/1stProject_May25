import styles from "./TaskInputForm.module.css";
// import PropTypes from "prop-types";
import type { JSX } from "react";
type TaskInputFormProps ={ searchInput:string, setSearchInput:React.Dispatch<React.SetStateAction<string>> }
function TaskInputForm({ searchInput, setSearchInput }:TaskInputFormProps):JSX.Element {
    const switchTheme = ():void => {

        // console.log(e.target);
        let curTheme = document.querySelector("body")!.getAttribute("data-theme");

        if (curTheme === "light") {
            document.querySelector("body")!.setAttribute("data-theme", "dark");
            document.getElementById("toggle")!.setAttribute("src", "/Assets/Color Scheme (1).svg");
        } else {
            document.querySelector("body")!.setAttribute("data-theme", "light");
            document.getElementById("toggle")!.setAttribute("src", "/Assets/Color Scheme.svg");
        }
    };
    const searchHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    return (
        <>
            <form>
                {/* <div className={styles.form_container}>
                    <label htmlFor="task-input" >Enter a task:</label>
                    <textarea className={styles.taskinput__textarea} name="Task-Input" id="task-input" required placeholder='Enter the task...'></textarea>
                </div>
                <div className={styles.form_container}>
                    <button className={styles.taskinput__submitbutton}>SUBMIT</button>
                </div> */}
                <div className={styles.header}>
                    {/* <div className={styles.searchBox}>
                        <input
                            type="text"
                            placeholder="Search notes..."
                            className={styles.searchInput}
                        />
                        <button className={styles.searchButton}>
                            Search
                        </button>
                    </div> */}
                    <div className={styles.search}>
                        <input onChange={searchHandler} value={searchInput} type="text" placeholder="Search note..." className={styles.searchNote}/>

                        {/* <textarea className={styles.taskinput__textarea} name="Task-Input" id="task-input" required placeholder='Enter the task...'></textarea><input type="text" name="search-note" className={styles.searchNote} id="search-note" placeholder="Search note..."/> */}

                        <img className={styles.vectorIcon} alt="" src="/Assets/Vector.svg" />
                    </div>
                    <div className={styles.select}>
                        <div className={styles.content}>
                            <div id="searchBtn" className={styles.all} aria-hidden>all</div>
                            {/* <img className={styles.chevronTopIcon} alt="" src="chevron-top.png" /> */}
                        </div>
                    </div>
                    <div className={styles.colorScheme}>
                        <div className={styles.colorSchemeChild} >
                            {/* <input type="checkbox" onChange={switchTheme}/> */}
                            {/* <button onClick={switchTheme} className="icon-button"> */}
                            <img id="toggle" className={styles.vectorIcon1} onClick={switchTheme} aria-hidden alt="" src="/Assets/Color Scheme.svg" />
                            {/* </button> */}
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
// TaskInputForm.propTypes = {
//     searchInput: PropTypes.string.isRequired,
//     setSearchInput: PropTypes.func.isRequired
// };

// console.log(styles.card)
export default TaskInputForm;
