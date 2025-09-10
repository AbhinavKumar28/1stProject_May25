import "../assets/styles/styles.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import type { Task, ComponentProps } from '../types/components.d.ts';
import type {JSX} from "react";
import componentsImports from '../constants/componentsImports.ts';
import { useEffectToShowTasks, useSearchFunctionality } from "../hooks/useTasks.ts";
function Id({ tasks, setTasks }:ComponentProps):JSX.Element{
    const { id } = useParams();
    const [searchInput, setSearchInput] = useState<string>("");
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    useEffectToShowTasks(setTasks,id)
    useSearchFunctionality(tasks,searchInput,setFilteredTasks)
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