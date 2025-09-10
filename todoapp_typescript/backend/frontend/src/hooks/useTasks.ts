import { useEffect } from "react";
import type { Task } from "../types/components";

export const useEffectToShowTasks = (setTasks:React.Dispatch<React.SetStateAction<Task[]>>,id:string|undefined)=>{
    useEffect(()=>{
                const showTask = async(): Promise<void> => {
                    let data: Task[] = []
                    try {
                        const response= await fetch(`http://localhost:3005/list/${id}/todos`,{
                            method:"GET",
                        });
                        data = await response.json();
                        console.log("hello",data);
                    }catch (err) {
                        console.error('Error:', err);
                    }
                    if (data) {
                        setTasks(data);
                    }
                }
                showTask()
            },
        []); 
}
export const useSearchFunctionality = (tasks:Task[], searchInput:string, setFilteredTasks:React.Dispatch<React.SetStateAction<Task[]>>)=>{
    useEffect(() => {
            let filter:Task[] = [...tasks];
    
            if ((searchInput !== "") &&(filter.length!==0)) {
                filter = filter.filter(el => {
    
                     
                    let item = el.todonote.toLowerCase();
    
                    return item.includes(searchInput.toLowerCase());
                });
            }
                 setFilteredTasks([...filter]);
        }, [tasks, searchInput]);
        
}