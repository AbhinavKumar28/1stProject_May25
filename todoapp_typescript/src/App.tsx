import { useState, useEffect } from "react";
import type {JSX} from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

// import IncompletedTasks from "./components/IncompletedTask/IncompletedTask";
// import CompletedTasks from "./components/CompletedTask/CompletedTask";
import TaskInputForm from "./components/TaskInputForm/TaskInputForm.tsx";
import BothTasks from "./components/BothTask/BothTask.tsx";
import Heading from "./components/Heading/heading.tsx";
import AddNewNote from "./components/addNewNote/addNewNote.tsx";

// import HeaderImage from './components/HeaderImage/HeaderImage'

function App():JSX.Element {

    // const [count, setCount] = useState(0)
    const [tasks, setTasks] = useState<string[]>([]);
    const [searchInput, setSearchInput] = useState<string>("");
    const [filteredTasks, setFilteredTasks] = useState<string[]>([]);

    useEffect(() => {
        let filter:string[] = [...tasks];

        // console.log("filter", filter);
        if ((searchInput !== "") &&(filter.length!==0)) {
            filter = filter.filter(el => {

                 
                let item = el.toLowerCase();

                return item.includes(searchInput.toLowerCase());
            });
        }

        // console.log("filter1", filter);
        setFilteredTasks([...filter]);
    }, [tasks, searchInput]);
    return (
        <>
            {/* <div className="background-color"> */}
            <Heading/>
            {/* <h1 >ToDo List</h1> */}
            <TaskInputForm searchInput={searchInput} setSearchInput={setSearchInput}/>
            {/* <IncompletedTasks />
            <CompletedTasks /> */}
            <AddNewNote tasks={tasks} setTasks={setTasks}/>
            <BothTasks tasks={filteredTasks} setTasks={setTasks}/>
            {/* </div> */}
        </>
    );
}

export default App;
