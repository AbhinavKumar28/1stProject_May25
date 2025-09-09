import { useState } from "react";
import type {JSX} from "react";
import "../assets/styles/styles.css";
import Rout from "../routes/routes.tsx";
import type { Task } from '../types/components.d.ts';
function App():JSX.Element {
    const [tasks, setTasks] = useState<Task[]>([]);

    return (
        <>
            <Rout tasks={tasks} setTasks={setTasks}/>
        </>
    );
}

export default App;
