import "../assets/styles/styles.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import type { Task, ComponentProps } from '../types/components.d.ts';
import type {JSX} from "react";
import componentsImports from '../constants/componentsImports.ts';
function Id({ tasks, setTasks }:ComponentProps):JSX.Element{
    const { id } = useParams();
    const [searchInput, setSearchInput] = useState<string>("");
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
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
    
    return (
        <>
                        <componentsImports.Heading id={id}/>
                        <componentsImports.TaskInputForm searchInput={searchInput} setSearchInput={setSearchInput}/>
                        <componentsImports.AddNewNote tasks={tasks} setTasks={setTasks}/>
                        <componentsImports.BothTasks tasks={filteredTasks} setTasks={setTasks}/>
                        <componentsImports.BackImage />
                        </>
    )
}

export default Id