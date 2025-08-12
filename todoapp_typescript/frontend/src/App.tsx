import { useState, useEffect } from "react";
import type {JSX} from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
// import IncompletedTasks from "./components/IncompletedTask/IncompletedTask";
// import CompletedTasks from "./components/CompletedTask/CompletedTask";

import AddNewNote_1 from "./components/add-todo/addNewNote.tsx";
import HomeScreen from "./components/homeScreen/homeScreen.tsx";
import Id from "./components/Id/Id.tsx";
// import { ObjectId } from "mongodb";
type Task = {
  _id: string;
  todonote: string;
  category: "personal" | "work" | "household"
};
// import HeaderImage from './components/HeaderImage/HeaderImage'

function App():JSX.Element {

    // const [count, setCount] = useState(0)
    const [tasks, setTasks] = useState<Task[]>([]);
    // const [searchInput, setSearchInput] = useState<string>("");
    // const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);


    return (
        <>
            {/* <div className="background-color"> */}
            <Router>
                <Routes>
                    
                    {/* <Route path="/add-todo" element={<AddNewNote_1 tasks={tasks} setTasks={setTasks}/>} /> */}
                    <Route path="/list/:id/todos" element={<Id />
                    } />
                    <Route path="/" element={<HomeScreen tasks={tasks} setTasks={setTasks}/>} />
                    
                </Routes>
            </Router>
        </>
    );
}

export default App;
