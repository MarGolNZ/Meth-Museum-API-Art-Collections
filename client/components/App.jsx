import React from 'react'
import { Route } from "react-router-dom";
import DepartmentData from './DepartmentData';

function App() {


  return (
    <>
      <Route path='/' component={DepartmentData} />

      {/* {objectIds.map(objectId => <li key={objectId}>{objectId}</li>)} */}

    </>

  )
}

export default App
