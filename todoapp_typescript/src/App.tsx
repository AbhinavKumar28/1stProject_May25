// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import IncompletedTasks from './components/IncompletedTask/IncompletedTask.tsx'
import CompletedTasks from './components/CompletedTask/CompletedTask.tsx'
import TaskInputForm from './components/TaskInputForm/TaskInputForm.tsx'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <h1>ToDo App</h1>
      <TaskInputForm />
      <IncompletedTasks />
      <CompletedTasks />
    </>
  )
}

export default App
