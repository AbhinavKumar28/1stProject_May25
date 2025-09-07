import type { JSX } from "react";
import "../styles/styles.css";

import '../Assets/back-arrow-svgrepo-com.svg';
import { useNavigate } from "react-router-dom"
import React from "react";
function BackImage():JSX.Element{
    const navigate = useNavigate();
    return(
        <>
            <img src="/Assets/back-arrow-svgrepo-com.svg" onClick={() => navigate('/')} aria-hidden className='backImage' alt="" />
        </>
    )
}
export default BackImage