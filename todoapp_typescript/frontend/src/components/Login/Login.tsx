import type { JSX } from "react";
import styles from "./Login.module.css";
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
function Login ():JSX.Element{
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
            data.email= a.value
        }
        const c = document.getElementById("password")?document.getElementById("password"):null
        if (c instanceof HTMLInputElement){
            data.password= c.value
        }
        try {
            const response= await fetch('http://localhost:3005/login',{
                method:"GET",
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
            
            
        
    return <>
        <div className={styles.newNoteHeading}><h1>Sign Up</h1>
                        </div>
                        <div className={styles.search}>
                            <input type="text" placeholder="Name" id = "signup-name" className={styles.searchNote} />
                        </div>
                        <div className={styles.search}>
                            <input type="text" placeholder="Email Id" id = "signup-email" className={styles.searchNote} />    
                        </div>
                        <div className={styles.search}>
                            <input type="text" placeholder="Password" id = "signup-password" className={styles.searchNote} />
                        </div>
                        <div className={styles.search}>
                            <input type="text" placeholder="Confirm Password" id = "signup-confirm-password" className={styles.searchNote} />
                        </div>
                        <button

                                className={styles.button1}
                                onClick={handleSignup}

                                // style={{ marginLeft: "auto" }}
                            >
                        Sign Up
                            </button>
    
    <div className={styles.newNoteHeading}><h1>Login</h1>
                        </div>
                        <div className={styles.search}>
                            <input type="text" placeholder="Email Id" id = "login-email" className={styles.searchNote} />    
                        </div>
                        <div className={styles.search}>
                            <input type="text" placeholder="Password" id = "password" className={styles.searchNote} />
                        </div>
                        <button

                                className={styles.button1}
                                onClick={handleLogin}

                                // style={{ marginLeft: "auto" }}
                            >
                        Login
                            </button>
    </>
}
export default Login