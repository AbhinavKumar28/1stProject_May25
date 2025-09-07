import type { JSX } from "react";
import React from "react";
import "../styles/styles.css";
// import bcrypt from "bcrypt"

type Data = {
    name:string,
    email:string,
    password: string
}

type Data_login = {
    email:string,
    password: string
}
type Task = {
    _id:string,
    todonote:string,
    category: string
}
type Category = {
    _id:string,
    category: string
}
type AddNewNoteProps = { tasks:Task[], setTasks:React.Dispatch<React.SetStateAction<Task[]>>}
// function AddNewNote(
function Login ({ tasks, setTasks }:AddNewNoteProps):JSX.Element{
    let data:Data = {} as Data 
    let data_login:Data_login = {} as Data_login
    const handleSignup = async():Promise<void> => {
            const a = document.getElementById("signup-name")?document.getElementById("signup-name"):null
            if (a instanceof HTMLInputElement){
                data.name= a.value
            }
            const b = document.getElementById("signup-email")?document.getElementById("signup-email"):null
            if (b instanceof HTMLInputElement){
                data.email= b.value
            }
            const c = document.getElementById("signup-password")?document.getElementById("signup-password"):null
            if (c instanceof HTMLInputElement){
                data.password= c.value
            }
            const d = document.getElementById("signup-confirm-password")?document.getElementById("signup-confirm-password"):null
            if (d instanceof HTMLInputElement&& c instanceof HTMLInputElement){
                if ( d.value!==c.value){
                    return 
                }else{
                    try {
                        const response= await fetch('http://localhost:3005/Signup',{
                            method:"POST",
                            headers:{
                                "Content-Type":"application/json",
                            },
                            body:JSON.stringify(data)
                        })
                        let data_1 = await response.json();
                        console.log("hello",data_1);
                    }catch (err) {
                        console.error('Error:', err);
                    }        
                }
            }
            
        }
        
    async function handleLogin():Promise<void>{
        const a = document.getElementById("login-email")?document.getElementById("login-email"):null
        if (a instanceof HTMLInputElement){
            data_login.email= a.value
        }
        const c = document.getElementById("password")?document.getElementById("password"):null
        if (c instanceof HTMLInputElement){
            data_login.password= c.value
        }
        try {
            const response= await fetch('http://localhost:3005/login',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(data_login)
            })
            let data_1 = await response.json();
                        console.log("hello",data_1);
                    }catch (err) {
                        console.error('Error:', err);
                    }        
            }
            
           
        
    return <>
        <div className='newNoteHeading'><h1>Sign Up</h1>
                        </div>
                        <div className='inputContainer'>
                            <input type="text" placeholder="Name" id = "signup-name" className='inputElement'/>
                        </div>
                        <div className='inputContainer'>
                            <input type="text" placeholder="Email Id" id = "signup-email" className='inputElement'/>    
                        </div>
                        <div className='inputContainer'>
                            <input type="text" placeholder="Password" id = "signup-password" className='inputElement'/>
                        </div>
                        <div className='inputContainer'>
                            <input type="text" placeholder="Confirm Password" id = "signup-confirm-password" className='inputElement'/>
                        </div>
                        <button

                                className='addButton'
                                onClick={handleSignup}

                                // style={{ marginLeft: "auto" }}
                            >
                        Sign Up
                            </button>
    
    <div className='newNoteHeading'><h1>Login</h1>
                        </div>
                        <div className='inputContainer'>
                            <input type="text" placeholder="Email Id" id = "login-email" className='inputElement'/>    
                        </div>
                        <div className='inputContainer'>
                            <input type="text" placeholder="Password" id = "password" className='inputElement'/>
                        </div>
                        <button

                                className='addButton'
                                onClick={handleLogin}

                                // style={{ marginLeft: "auto" }}
                            >
                        Login
                            </button>
    </>
}
export default Login