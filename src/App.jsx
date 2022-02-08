import { Container } from "reactstrap"
import ProjectCard from "./components/ProjectCard";
import projectJson from "./projects.json"
import Login from "./views/Login"
import { useEffect, useState } from "react";
import "./App.css"
import getUsers from "./services/list";
import SignUp from "./components/SignUp";

function App() {
  let [showLoginPage, setShowLoginPage] = useState(true)
  let [runEffect, setRunEffect] = useState(1);
  const title = showLoginPage ? "Login" : "Projects"
  let [showList, setShowList] = useState([]);
  useEffect(() => {
    let mounted = true
    getUsers().then((users) => {
      if (mounted) {
        setShowList(users.data)
      }
    })
    return () => mounted = false;
  }, [])
  // useEffect(() => {
  //   console.log("Inside USE effect",runEffect)
  //   setTimeout(()=>{
  //     const isLoggedIn = localStorage.getItem("isLoggedIn")
  //     if(isLoggedIn)setShowLoginPage(false)
  //   },1000)
  // },[runEffect]);
  const onLoginSuccess = () => {
    setShowLoginPage(false)
    localStorage.setItem("isLoggedIn", true)
  }
  // const onLogoutSuccess = () => {
  //   setShowLoginPage(true)
  //   localStorage.setItem("isLoggedIn",false)
  // }
  console.log("This runs before returning")
  return (
    <div className="App">
      <h1>{title}</h1>
      <button onClick={() => setRunEffect(runEffect + 1)}>Run Result</button>
      <button onClick={() => setShowLoginPage(false)}>See Products Page</button>
      {showLoginPage ? (<div>
        <Login onLoginSuccess={onLoginSuccess} />
        <SignUp/>
      </div>) : (<div>
        {/* {
     projectJson.map((project) => {
       return (<ProjectCard imgAltText={"Image not displayed"} imgSrcUrl={project.image_url} cardTitle={project.name}
        description={project.description}/>)
        })
      } */}
        {
          showList.map((user) => {
            return <ProjectCard imgSrcUrl={user.avatar} imgAltText={"Img not found"} cardTitle={user.first_name + " " + user.last_name}
              description={user.email} />
          })
        }

      </div>)}
    </div>
  );
}

export default App;
