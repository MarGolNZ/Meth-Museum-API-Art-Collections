import request from 'superagent'

const serverURL = 'http://localhost:3000/api/v1'

// Fetch the welcome message from the server
export function getWelcome() {
  return request
    .get(`${serverURL}/welcome`)
    .then(response => response.body)
    .catch(error => console.error('Error fetching welcome:', error))
}

// Fetch department data from the server
export function getDepartments() {
  return request
    .get(`${serverURL}/departments`)
    .then(response => response.body)
    .catch(error => console.error('Error fetching departments:', error))
}

// Fetch objects by department ID
export function getObjects(departmentIds = 1) {
  return request
    .get(`${serverURL}/objects`)
    .query({ departmentIds }) // Pass departmentIds as a query parameter
    .then(response => response.body)
    .catch(error => console.error('Error fetching objects:', error))
}

// Fetch objects by department ID with specific search criteria
export function getObjectsByDepartment(depId, query = 'painting') {
  return request
    .get(`${serverURL}/objects/search`)
    .query({ depId, q: query }) // Pass depId and search query as query parameters
    .then(response => response.body)
    .catch(error => console.error('Error fetching objects by department:', error))
}
