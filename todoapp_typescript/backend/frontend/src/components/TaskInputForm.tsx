import React from "react";
import "../assets/styles/styles.css";
import images from '../constants/imagesImports.ts'
import type { JSX } from "react";
import type { TaskInputFormProps } from '../types/components.d.ts';
function TaskInputForm({ searchInput, setSearchInput }:TaskInputFormProps):JSX.Element {
    const switchTheme = ():void => {

        // console.log(e.target);
        let curTheme = document.querySelector("body")!.getAttribute("data-theme");

        if (curTheme === "light") {
            document.querySelector("body")!.setAttribute("data-theme", "dark");
            document.getElementById("toggle")!.setAttribute("src", images.toggleLight);
        } else {
            document.querySelector("body")!.setAttribute("data-theme", "light");
            document.getElementById("toggle")!.setAttribute("src", images.toggleDark);
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

                        
                        <img className='searchIcon' alt="" src={images.search} />
                    </div>
                    <div className='colorScheme'>
                        <div className='colorSchemeChild'>
                            <img id="toggle" className='darkModeToggle'onClick={switchTheme} aria-hidden alt="" src={images.toggleDark} />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
export default TaskInputForm;
