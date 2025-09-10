import { useEffect } from "react";
import type { Category, Task } from "../types/components";

export const useEffectToShowCategory = (setCategories:React.Dispatch<React.SetStateAction<Category[]>>)=>{
        useEffect(()=>{
            const showCategory = async(): Promise<void> => {
                    let data: Task[] = []
                    try {
                        const response= await fetch(`http://localhost:3005/list/categories`,{
                            method:"GET",
                        });
                        data = await response.json();
                        console.log("hello",data);
                        // return data
                    }catch (err) {
                        console.error('Error:', err);
                        // return []
                    }
                    if (data) {
                        setCategories(data);
                    }
                }
                showCategory()
            
        },[])
    }
    