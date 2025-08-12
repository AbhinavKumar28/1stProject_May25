import React from "react";
import TaskInputForm from "../TaskInputForm/TaskInputForm.tsx";
import BothTasks from "../BothTask/BothTask.tsx";
import Heading from "../Heading/heading.tsx";
import AddNewNote from "../addNewNote/addNewNote.tsx";
import styles from "./Id.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import BackImage from "../BackImage/BackImage.tsx";
import type {JSX} from "react";
type Task = {
    _id:string,
    todonote:string,
    category: "personal" | "work" | "household"
}
// type AddNewNoteProps = { tasks:Task[], setTasks:React.Dispatch<React.SetStateAction<Task[]>>}

function Id():JSX.Element{
    const { id } = useParams();
    const [tasks, setTasks] = useState<Task[]>([]);
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
                    // return data
                }catch (err) {
                    console.error('Error:', err);
                    // return []
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

        // console.log("filter", filter);
        if ((searchInput !== "") &&(filter.length!==0)) {
            filter = filter.filter(el => {

                 
                let item = el.todonote.toLowerCase();

                return item.includes(searchInput.toLowerCase());
            });
        }

        // console.log("filter1", filter);
        setFilteredTasks([...filter]);
    }, [tasks, searchInput]);
    
    return (
        <>
                        <Heading id={id}/>
                        <TaskInputForm searchInput={searchInput} setSearchInput={setSearchInput}/>
                        <AddNewNote tasks={tasks} setTasks={setTasks}/>
                        <BothTasks tasks={filteredTasks} setTasks={setTasks}/>
                        <BackImage />
                        </>
    )
}

export default Id