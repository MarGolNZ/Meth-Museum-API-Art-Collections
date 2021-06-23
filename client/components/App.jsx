import React, { useState, useEffect } from 'react'

import { getDepartment } from '../api'

function App() {
  const [departmentList, setDepartmentList] = useState([])

  useEffect(() => {
    getDepartment()
      .then(result => {
        setDepartmentList(result.departments)

        return null
      })
      .catch((err) => {
        console.error(err.message)
      })
  })

  return (
    <>
      <h1>The Metropolitan Museum of Art Collection API</h1>
      <ul>
        {departmentList.map(department => <li key={department.departmentId}><a href={`/department/${department.departmentId}`}>{department.displayName}</a></li>)}
      </ul>

      {/* {objectIds.map(objectId => <li key={objectId}>{objectId}</li>)} */}

    </>
  )
}

export default App
