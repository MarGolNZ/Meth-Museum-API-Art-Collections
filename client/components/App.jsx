import React, { useState, useEffect } from 'react'

import { getObjectIds } from '../api'

function App() {
  const [objectIds, setObjectIds] = useState([])

  useEffect(() => {

    getObjectIds()
      .then(result => {
        setObjectIds(result.objectIDs[0])
        return null
      })
      .catch((err) => {
        console.error(err.message)
      })
  })

  return (
    <ul>
      <li>{objectIds}</li>
      {/* {objectIds.map(objectId => <li>{objectId}</li>)} */}
    </ul>
  )
}

export default App
