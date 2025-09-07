import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from "./homeScreen.tsx";
import { useState, type JSX } from "react";
import Id from "./Id.tsx";
import Login from './Login.tsx';
type Task = {
  _id: string;
  todonote: string;
  category: string;
};
type BothTasksProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

function Rout({ tasks, setTasks }:BothTasksProps):JSX.Element{
        
    return  <Router>
                <Routes>
                    
                    {/* <Route path="/add-todo" element={<AddNewNote_1 tasks={tasks} setTasks={setTasks}/>} /> */}
                    <Route path="/list/:id/todos" element={<Id tasks={tasks} setTasks={setTasks}/>} />
                    <Route path="/" element={<HomeScreen tasks={tasks} setTasks={setTasks}/>} />
                    <Route path="/login" element={<Login tasks={tasks} setTasks={setTasks}/>} />
                </Routes>
            </Router>
        
}
export default Rout;
//login, no states, make one object for link, style.css in build, 