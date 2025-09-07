import React from "react";
import "../styles/styles.css";
import '../Assets/Vector.svg';
import '../Assets/Color-Scheme.svg';
import '../Assets/Color-Scheme-(1).svg';
// import PropTypes from "prop-types";
import type { JSX } from "react";
type TaskInputFormProps ={ searchInput:string, setSearchInput:React.Dispatch<React.SetStateAction<string>> }
function TaskInputForm({ searchInput, setSearchInput }:TaskInputFormProps):JSX.Element {
    const switchTheme = ():void => {

        // console.log(e.target);
        let curTheme = document.querySelector("body")!.getAttribute("data-theme");

        if (curTheme === "light") {
            document.querySelector("body")!.setAttribute("data-theme", "dark");
            document.getElementById("toggle")!.setAttribute("src", "/Assets/Color-Scheme-(1).svg");
        } else {
            document.querySelector("body")!.setAttribute("data-theme", "light");
            document.getElementById("toggle")!.setAttribute("src", "/Assets/Color-Scheme.svg");
        }
    };
    const searchHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    return (
        <>
            <form>
               
                <div className='header'>
                    
                    <div className='inputContainer'>
                        <input onChange={searchHandler} value={searchInput} type="text" placeholder="Search note..." className='inputElement'/>

                        
                        <img className='searchIcon' alt="" src="/Assets/Vector.svg" />
                    </div>
                    <div className='colorScheme'>
                        <div className='colorSchemeChild'>
                            <img id="toggle" className='darkModeToggle'onClick={switchTheme} aria-hidden alt="" src="/Assets/Color-Scheme.svg" />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
export default TaskInputForm;
