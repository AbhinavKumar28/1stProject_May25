import { useState, useEffect } from "react";

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

// import IncompletedTasks from "./components/IncompletedTask/IncompletedTask";
// import CompletedTasks from "./components/CompletedTask/CompletedTask";
import TaskInputForm from "./components/TaskInputForm/TaskInputForm";
import BothTasks from "./components/BothTask/BothTask";
import Heading from "./components/Heading/heading";
import AddNewNote from "./components/addNewNote/addNewNote";

// import HeaderImage from './components/HeaderImage/HeaderImage'

function App() {

    // const [count, setCount] = useState(0)
    const [tasks, setTasks] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(() => {
        let filter = [...tasks];

        // console.log("filter", filter);
        if (searchInput !== "") {
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
