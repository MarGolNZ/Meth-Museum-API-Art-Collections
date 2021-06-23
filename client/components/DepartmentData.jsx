import React, { useState, useEffect } from 'react'
import { getDepartment } from '../api'
import { Link } from "react-router-dom";

export default function DepartmentData(props) {
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
                {departmentList.map(department => <li key={department.departmentId}><Link to={`/department/${department.departmentId}`}>{department.displayName}</Link></li>)}
            </ul>
        </>
    )
}

