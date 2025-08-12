import styles from "./heading.module.css";
import type {JSX} from "react";
function Heading({ id }: { id?: string }):JSX.Element {
    return (
        <>
            <h1 className={styles.h1}>{id?id.toUpperCase():null}</h1>
        </>
    );
}
export default Heading;
