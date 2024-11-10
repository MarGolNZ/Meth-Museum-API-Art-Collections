import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getObjectsByDepartment, getObjectDetails } from '../api'

function DepartmentObjects () {
  const { departmentId } = useParams()
  const location = useLocation()
  const departmentName = location.state?.departmentName || 'Department'
  const [objectIds, setObjectIds] = useState([])
  const [objects, setObjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getObjectsByDepartment(departmentId)
      .then((data) => {
        setObjectIds(data.objectIDs)
        setLoading(false)
      })
      .catch((err) => {
        setError('Failed to load objects')
        setLoading(false)
        console.error('Error fetching objects:', err)
      })
  }, [departmentId])

  useEffect(() => {
    if (!objectIds || objectIds.length === 0) {
      setObjects([])
      setLoading(false)
      return
    }

    setLoading(true)
    const objectDataPromises = objectIds.map(id => getObjectDetails(id))

    Promise.all(objectDataPromises)
      .then(objectData => {
        setObjects(objectData)
        setLoading(false)
      })
      .catch(err => {
        setError('Failed to load object details')
        setLoading(false)
      })
  }, [objectIds])

  if (loading) return <p>Loading objects...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      {objects.length === 0
        ? <p>No objects found for department {departmentName}</p>
        : <h2>Objects in {departmentName}</h2>
      }

      <ul>
        {objects.map((object, idx) => (
          <li key={object.objectID}>
            <h3>{object.title}</h3>
            <p>Artist: {object.artistDisplayName || 'Unknown'}</p>
            <p>Date: {object.objectDate || 'Unknown'}</p>
            {object.primaryImage && (
              <img src={object.primaryImage} alt={object.title} width="200" />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DepartmentObjects
