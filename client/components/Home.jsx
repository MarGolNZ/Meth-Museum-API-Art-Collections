import React, { useState } from 'react'
import Header from './Header'
import DepartmentData from './DepartmentData'

function Home () {
  const [selectedDepartment, setSelectedDepartment] = useState(null)

  const handleDepartmentSelect = (departmentId) => {
    setSelectedDepartment(departmentId)
  }
  return (
    <div>
      <Header />
      <div className="content">
        <DepartmentData onDepartmentSelect={handleDepartmentSelect} />
        {selectedDepartment === null && (
          <div className="welcome-placeholder">
            <h2>Welcome to the Met Museum Art Explorer!</h2>
            <p>Select a department to explore the Met Museum Art collections or search the collection.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
