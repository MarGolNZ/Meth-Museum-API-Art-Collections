import React, { useEffect, useState } from 'react'
import { Link, Route, useRouteMatch } from 'react-router-dom'
import DepartmentObjects from './DepartmentObjects'
import { getDepartments } from '../api'
import './DepartmentData.css'

function DepartmentData () {
  const [activeDepartment, setActiveDepartment] = useState(null)
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { path, url } = useRouteMatch()

  useEffect(() => {
    getDepartments()
      .then(data => {
        setDepartments(data.departments)
        setLoading(false)
      })
      .catch(err => {
        setError('Failed to load departments')
        setLoading(false)
      })
  }, [])

  const handleButtonClick = (departmentId) => {
    setActiveDepartment(departmentId) // Set the active department when clicked
  }

  if (loading) return <p>Loading departments...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <div className="side-nav">
        <h2>Departments</h2>
        {departments.map(dept => (
          <button
            key={dept.departmentId}
            className={`department-button ${activeDepartment === dept.departmentId ? 'active' : ''}`}
            onClick={() => handleButtonClick(dept.departmentId)}
          >
            <Link
              className="department-link"
              to={{
                pathname: `${url}/${dept.departmentId}`,
                state: { departmentName: dept.displayName }
              }}
            >
              {dept.displayName}
            </Link>
          </button>
        ))}
      </div>

      <Route path={`${path}/:departmentId`} component={DepartmentObjects} />
    </div>
  )
}

export default DepartmentData
