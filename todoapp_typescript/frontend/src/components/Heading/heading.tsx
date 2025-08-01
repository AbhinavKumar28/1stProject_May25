import styles from "./heading.module.css";
import type {JSX} from "react";
function Heading():JSX.Element {
    return (
        <>
            <h1 className={styles.h1}>ToDo List</h1>
        </>
    );
}
export default Heading;
