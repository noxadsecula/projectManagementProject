import { useState } from "react";

import Sidebar from "./components/Sidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";


function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  })


  function handleAddTask(text) {
    setProjectState(prevState=>{
      const taskId = Math.random()
      const newTask = {
        text: text,
        projetId: prevState.selectedProjectId,
        id: taskId,
      }
      return{
        ...prevState,
        tasks: [newTask,...prevState.tasks]
      }
    })
  }

  function handleDeleteTask(id) {
    setProjectState(prevState => {
    return {
      ...prevState,
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }
  })


  }

  function handleStartAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId:null,

      }
    })
    
  }

  function handleAddProject(projectData) {
    setProjectState(prevState=>{
      const projectId = Math.random()
      const newProject = {
        ...projectData,
        id: projectId,
      }
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject ]
      }
    })
  }

  function handleCancelAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,

      }
    })

  }

  function handleSelectProject(id) {
    setProjectState(prevState => {
      return{
        ...prevState,
        selectedProjectId: id,
      }
    })

  }


  function handleDelete() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => project.id !== projectState.selectedProjectId),
      }
    })
  }


 

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId)
  let content = <SelectedProject 
  onDeleteTask={handleDeleteTask} 
  onAddTask={handleAddTask} 
  project={selectedProject} 
  onDelete={handleDelete}
  tasks={projectState.tasks}
  ></SelectedProject>;

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  }else if(projectState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}></NoProjectSelected>
  }
  return (
    <main className="h-screen my-8 flex gap-8">
    <Sidebar 
    onStartAddProject={handleStartAddProject} 
    projects={projectState.projects} 
    onSelectProject={handleSelectProject}
    selectedProjectId={projectState.selectedProjectId}/>
    {content}
    </main>
    
  );
}

export default App;
