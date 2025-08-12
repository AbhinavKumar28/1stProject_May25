import type { JSX } from "react";
import styles from "./BackImage.module.css";

import { useNavigate } from "react-router-dom"
function BackImage():JSX.Element{
    const navigate = useNavigate();
    return(
        <>
            <img src="/Assets/back-arrow-svgrepo-com.svg" onClick={() => navigate('/')} aria-hidden className={styles.backimage} alt="" />
        </>
    )
}
export default BackImage