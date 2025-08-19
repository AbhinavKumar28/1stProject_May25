import type { JSX } from "react";
import styles from "./Login.module.css";
function Login ():JSX.Element{
    return <>
        <div className={styles.newNoteHeading}><h1>Sign Up</h1>
                        </div>
                        <div className={styles.search}>
                            <input type="text" placeholder="Name" className={styles.searchNote} />
                        </div>
                        <div className={styles.search}>
                            <input type="text" placeholder="Email Id" className={styles.searchNote} />    
                        </div>
                        <div className={styles.search}>
                            <input type="text" placeholder="Password" className={styles.searchNote} />
                        </div>
                        <div className={styles.search}>
                            <input type="text" placeholder="Confirm Password" className={styles.searchNote} />
                        </div>
                        <button

                                className={styles.button1}
                                

                                // style={{ marginLeft: "auto" }}
                            >
                        Sign Up
                            </button>
    
    <div className={styles.newNoteHeading}><h1>Login</h1>
                        </div>
                        <div className={styles.search}>
                            <input type="text" placeholder="Email Id" className={styles.searchNote} />    
                        </div>
                        <div className={styles.search}>
                            <input type="text" placeholder="Password" className={styles.searchNote} />
                        </div>
                        <button

                                className={styles.button1}
                                

                                // style={{ marginLeft: "auto" }}
                            >
                        Login
                            </button>
    </>
}
export default Login