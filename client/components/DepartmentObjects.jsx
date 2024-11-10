import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getObjectsByDepartment } from '../api'

function DepartmentObjects () {
  const { departmentId } = useParams()
  const [objects, setObjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getObjectsByDepartment(departmentId)
      .then((data) => {
        setObjects(data.objectIDs)
        setLoading(false)
      })
      .catch((err) => {
        setError('Failed to load objects')
        setLoading(false)
        console.error('Error fetching objects:', err)
      })
  }, [departmentId])

  if (loading) return <p>Loading objects...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h2>Objects in Department {departmentId}</h2>
      <ul>
        {objects.map((objectId) => (
          <li key={objectId}>Object ID: {objectId}</li>
        ))}
      </ul>
    </div>
  )
}

export default DepartmentObjects
