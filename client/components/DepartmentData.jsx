import React, { useEffect, useState } from 'react'
import { Link, Route, useRouteMatch } from 'react-router-dom'
import DepartmentObjects from './DepartmentObjects'
import { getDepartments } from '../api'

function DepartmentData () {
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

  if (loading) return <p>Loading departments...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h2>Departments</h2>
      <ul>
        {departments.map(dept => (
          <button key={dept.departmentId}>
            <Link
              to={{
                pathname: `${url}/${dept.departmentId}`,
                state: { departmentName: dept.displayName }
              }}
            >
              {dept.displayName}
            </Link>
          </button>
        ))}
      </ul>

      <Route path={`${path}/:departmentId`} component={DepartmentObjects} />
    </div>
  )
}

export default DepartmentData
