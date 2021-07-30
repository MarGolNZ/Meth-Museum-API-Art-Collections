import React, { useState, useEffect } from 'react'
import { getObjectsbyDepartment } from '../api'

export default function DisplayArtPerDepartment(props) {
    const [objectList, setObjectList] = useState([])
    const departmentId = props.match.params

    useEffect(() => {
        getObjectsbyDepartment(departmentId.departmentId)
        console.log('logging departmentId:', departmentId.departmentId)
            .then(result => {
                // console.log('result from getObjectsbyDepartment', result)
                // setObjectList(result.objectIDs)
                return null
            })
            .catch((err) => {
                console.error(err.message)
            })
    }, departmentId)

    return (
        <>
            {objectList}
            {/* {objectList.map(objectId => <li key={objectId}>{objectId}</li>)} */}
        </>
    )


}