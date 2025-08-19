import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from "./components/homeScreen/homeScreen.tsx";
import { useState, type JSX } from "react";
import Id from "./components/Id/Id.tsx";
import Login from './components/Login/Login.tsx';
type Task = {
  _id: string;
  todonote: string;
  category: string;
};
function Rout():JSX.Element{
    const [tasks, setTasks] = useState<Task[]>([]);
        
    return  <Router>
                <Routes>
                    
                    {/* <Route path="/add-todo" element={<AddNewNote_1 tasks={tasks} setTasks={setTasks}/>} /> */}
                    <Route path="/list/:id/todos" element={<Id />} />
                    <Route path="/" element={<HomeScreen tasks={tasks} setTasks={setTasks}/>} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
        
}
export default Rout;