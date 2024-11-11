import request from 'superagent'

const serverURL = 'http://localhost:3000/api/v1'

// Fetch the welcome message from the server
export function getWelcome() {
  return request
    .get(`${serverURL}/welcome`)
    .then((response) => response.body)
    .catch((error) => console.error('Error fetching welcome:', error))
}

// Fetch department data from the server
export function getDepartments() {
  return request
    .get(`${serverURL}/departments`)
    .then((response) => response.body)
    .catch((error) => console.error('Error fetching departments:', error))
}

// Fetch objects by department ID
export function getObjects(departmentId = 1, page = 1, pageSize = 10) {
  return request
    .get(`${serverURL}/objects`)
    .query({ departmentIds: departmentId, page, pageSize }) // Pass departmentIds as a query parameter
    .then((response) => response.body)
    .catch((error) => console.error('Error fetching objects:', error))
}

// Fetch objects by department ID with specific search criteria
export function getObjectsByDepartment(depId, query = {}) {
  return request
    .get(`${serverURL}/objects/search`)
    .query({ depId, q: query })
    .then((response) => response.body)
    .catch((error) =>
      console.error('Error fetching objects by department:', error)
    )
}

// Fetch details of a specific object by its ID
export function getObjectDetails(objectId) {
  return request
    .get(`${serverURL}/objects/${objectId}`)
    .then((res) => res.body)
}
