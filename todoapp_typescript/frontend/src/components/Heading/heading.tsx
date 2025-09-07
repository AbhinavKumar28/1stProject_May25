import styles from "./heading.module.css";
import type {JSX} from "react";
function Heading({ id }: { id?: string }):JSX.Element {
    return (
        <>
            <div className={styles.newNoteHeading}><h1>{id?id.toUpperCase():null}</h1></div>
        </>
    );
}
export default Heading;
