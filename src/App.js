import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/HomePage/HomePage';
import Job from './components/JobDetails/Job';
import "./App.css"
const App = () => {
  return (
    <Router>
   
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/jobDetails' element={<Job/>}/>
        
    
     </Routes>
    
     </Router>
  )
}

export default App