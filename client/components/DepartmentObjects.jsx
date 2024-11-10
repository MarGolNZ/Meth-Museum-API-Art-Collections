import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getObjects, getObjectDetails } from '../api'

function DepartmentObjects () {
  const { departmentId } = useParams()
  const location = useLocation()
  const departmentName = location.state?.departmentName || 'Department'
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [objectIds, setObjectIds] = useState([])
  const [objects, setObjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setPage(1)
  }, [departmentId])

  useEffect(() => {
    setLoading(true)
    getObjects(departmentId, page, pageSize)
      .then(data => {
        setObjectIds(data.items)
        setTotalPages(data.totalPages)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [departmentId, page, pageSize])

  const handleNextPage = () => {
    if (page < totalPages) setPage(prevPage => prevPage + 1)
  }

  const handlePrevPage = () => {
    if (page > 1) setPage(prevPage => prevPage - 1)
  }

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
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {objects.map(object => (
            <tr key={object.objectID}>
              <td>
                {object.primaryImageSmall ? (
                  <img src={object.primaryImageSmall} alt={object.title} width="100" />
                ) : (
                  'No Image'
                )}
              </td>
              <td>{object.title}</td>
              <td>{object.artistDisplayName || 'Unknown'}</td>
              <td>{object.objectDate || 'Unknown'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
      <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
      <p>
            Page {page} of {totalPages}
      </p>
    </div>
  )
}

export default DepartmentObjects
