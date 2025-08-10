import type { JSX } from "react";
import styles from "./BackImage.module.css";
function BackImage():JSX.Element{
    return(
        <>
            <img src="/Assets/back-arrow-svgrepo-com.svg" aria-hidden className={styles.backimage} alt="" />
        </>
    )
}
export default BackImage