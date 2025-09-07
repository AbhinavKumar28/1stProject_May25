import { useState, useEffect } from "react";
import type {JSX} from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "../styles/styles.css";
import React from "react";
// import IncompletedTasks from "./components/IncompletedTask/IncompletedTask";
// import CompletedTasks from "./components/CompletedTask/CompletedTask";
import Rout from "./routes.tsx";
// import { ObjectId } from "mongodb";
type Task = {
  _id: string;
  todonote: string;
  category: string;
};
// import HeaderImage from './components/HeaderImage/HeaderImage'

function App():JSX.Element {

    // const [count, setCount] = useState(0)
    // const [tasks, setTasks] = useState<Task[]>([]);
    // const [searchInput, setSearchInput] = useState<string>("");
    // const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);  
    const [tasks, setTasks] = useState<Task[]>([]);

    return (
        <>
            {/* <div className="background-color"> */}
            <Rout tasks={tasks} setTasks={setTasks}/>
        </>
    );
}

export default App;
