import {lazy} from 'react'
const componentsImports = {
   HomePage : lazy(() => import("../pages/HomePage.tsx")),
   LoginPage : lazy(() => import("../pages/Login.tsx")),
   TodosPage :lazy(() => import("../pages/Id.tsx")),
   AddNewNote : lazy(() => import("../components/AddNewNote.tsx")),
   BackImage : lazy(() => import("../components/BackImage.tsx")),
   BothTasks : lazy(() => import("../components/BothTask.tsx")),
   TaskInputForm : lazy(() => import("../components/TaskInputForm.tsx")),
   Heading : lazy(() => import("../components/Heading.tsx")),
   EditIcon : lazy(() => import("../components/EditIcon.tsx")),
};
export default componentsImports