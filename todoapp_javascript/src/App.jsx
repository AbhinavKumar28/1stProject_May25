import { useState } from "react";

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

    return (
        <>
            {/* <div className="background-color"> */}
            <Heading/>
            {/* <h1 >ToDo List</h1> */}
            <TaskInputForm />
            {/* <IncompletedTasks />
            <CompletedTasks /> */}
            <AddNewNote tasks={tasks} setTasks={setTasks}/>
            <BothTasks tasks={tasks} setTasks={setTasks}/>
            {/* </div> */}
        </>
    );
}

export default App;
