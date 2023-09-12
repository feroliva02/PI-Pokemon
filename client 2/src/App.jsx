import Home from "./views/Home/Home";
import Landing from "./views/Landing/Landing";
import Form from "./views/Form/Form";
import Detail from "./views/Detail/Detail";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import "../src/App.css"

function App() {
    
  const {pathname} = useLocation();

  return (
    <div className="App">
      {pathname !== "/" && <Navbar/>}
      
      <Routes>
        <Route exact path="/" element={<Landing />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/detail/:id" element ={<Detail/>}/>
        <Route path="/form" element={<Form />}></Route>
      </Routes>
      
    </div>
  );
}

export default App
