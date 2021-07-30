import React from 'react'
import { Route } from "react-router-dom";
import DepartmentData from './DepartmentData';
import DisplayArtPerDepartment from './DisplayArtPerDepartment';
import Home from './Home'

function App() {
  return (
    <>
      <Route exact path='/' component={Home}></Route>
      <Route path='/department' component={DepartmentData} />
      <Route path='/department/:departmentId' component={DisplayArtPerDepartment}></Route>
    </>
  )
}

export default App
