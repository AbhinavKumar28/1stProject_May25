import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import IncompletedTasks from './components/IncompletedTask/IncompletedTask'
import CompletedTasks from './components/CompletedTask/CompletedTask'
import TaskInputForm from './components/TaskInputForm/TaskInputForm'
import HeaderImage from './components/HeaderImage/HeaderImage'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <HeaderImage /> */}
      <h1>ToDo App</h1>
      <TaskInputForm />
      <IncompletedTasks />
      <CompletedTasks />
    </>
  )
}

export default App
