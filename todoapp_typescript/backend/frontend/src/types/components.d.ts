export type Data = {
    name:string,
    email:string,
    password: string
}
export type Data_login = {
    email:string,
    password: string
}
export type Task = {
    _id:string,
    todonote:string,
    category: string
}
export type Category = {
    _id:string,
    category: string
}
export type TaskInputFormProps ={ 
    searchInput:string, 
    setSearchInput:React.Dispatch<React.SetStateAction<string>> 
}
export type EditIconProps = {
    tasks:Task[], 
    setTasks:React.Dispatch<React.SetStateAction<Task[]>>, 
    index:string
}
export type ComponentProps = { 
    tasks:Task[], 
    setTasks:React.Dispatch<React.SetStateAction<Task[]>>
}
