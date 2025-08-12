// import { useState, useEffect } from "react";
// import type {JSX} from "react";
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// import "./App.css";
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// // import IncompletedTasks from "./components/IncompletedTask/IncompletedTask";
// // import CompletedTasks from "./components/CompletedTask/CompletedTask";
// import TaskInputForm from "./components/TaskInputForm/TaskInputForm.tsx";
// import BothTasks from "./components/BothTask/BothTask.tsx";
// import Heading from "./components/Heading/heading.tsx";
// import AddNewNote from "./components/addNewNote/addNewNote.tsx";
// import AddNewNote_1 from "./components/add-todo/addNewNote.tsx";
// import HomeScreen from "./components/homeScreen/homeScreen.tsx";
// import BackImage from "./components/BackImage/BackImage.tsx";
// // import { ObjectId } from "mongodb";
// type Task = {
//   _id: string;
//   todonote: string;
// //   category: "Personal" | "Work" | "Household"
// };
// // import HeaderImage from './components/HeaderImage/HeaderImage'

// function App():JSX.Element {

//     // const [count, setCount] = useState(0)
//     const [tasks, setTasks] = useState<Task[]>([]);
//     const [searchInput, setSearchInput] = useState<string>("");
//     const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);


//     useEffect(() => {
//         let filter:Task[] = [...tasks];

//         // console.log("filter", filter);
//         if ((searchInput !== "") &&(filter.length!==0)) {
//             filter = filter.filter(el => {

                 
//                 let item = el.todonote.toLowerCase();

//                 return item.includes(searchInput.toLowerCase());
//             });
//         }

//         // console.log("filter1", filter);
//         setFilteredTasks([...filter]);
//     }, [tasks, searchInput]);
//     return (
//         <>
//             {/* <div className="background-color"> */}
//             <Router>
//                 <Routes>
                    
//                     <Route path="/add-todo" element={<AddNewNote_1 tasks={tasks} setTasks={setTasks}/>} />
//                     <Route path="/previous" element={<>
//                         <Heading/>
//                         <TaskInputForm searchInput={searchInput} setSearchInput={setSearchInput}/>
                        
//                         <AddNewNote tasks={tasks} setTasks={setTasks}/>
//                         <BothTasks tasks={filteredTasks} setTasks={setTasks}/>
//                         <BackImage />
//                         </>
//                     } />
//                     <Route path="/" element={<HomeScreen tasks={tasks} setTasks={setTasks}/>} />
                    
//                 </Routes>
//             </Router>
//         </>
//     );
// }

// export default App;
