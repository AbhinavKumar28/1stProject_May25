import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {type JSX } from "react";
import { PATH } from '../constants/paths.ts';
import type { ComponentProps } from '../types/components.d.ts';
import componentsImports from '../constants/componentsImports.ts';
function Rout({ tasks, setTasks }:ComponentProps):JSX.Element{
    return  <Router>
                <Routes>
                    <Route path={PATH.TODOS_SHOW} element={<componentsImports.TodosPage tasks={tasks} setTasks={setTasks}/>} />
                    <Route path={PATH.HOME} element={<componentsImports.HomePage tasks={tasks} setTasks={setTasks}/>} />
                    <Route path={PATH.LOGIN} element={<componentsImports.LoginPage tasks={tasks} setTasks={setTasks}/>} />
                </Routes>
            </Router>
}
export default Rout;