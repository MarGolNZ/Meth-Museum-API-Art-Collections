import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import './QueryTool.css'

function CollectionSearch ({ departmentName, onSearch }) {
  const history = useHistory()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState(new URLSearchParams(location.search).get('search') || '')
  const [selectedField, setSelectedField] = useState(new URLSearchParams(location.search).get('field') || 'title')

  const handleSearch = () => {
    const query = {
      search: searchQuery,
      field: selectedField
    }
    const searchParams = new URLSearchParams(query).toString()
    history.push(`${location.pathname}?${searchParams}`)
    onSearch(query)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSelectedField('title')
    history.push(location.pathname)
    onSearch({ search: '', field: 'title' })
  }

  return (
    <div className='search-container'>
      <h2>Search the {departmentName} Collection</h2>

      <div className='form-group'>
        <select value={selectedField} onChange={(e) => setSelectedField(e.target.value)}>
          <option value="title">Title</option>
          <option value="artistOrCulture">Artist/Culture</option>
        </select>

        <input
          placeholder={`Search by ${selectedField}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={clearSearch} style={{ marginLeft: '10px' }}>Clear</button>
      </div>
    </div>
  )
}

export default CollectionSearch
