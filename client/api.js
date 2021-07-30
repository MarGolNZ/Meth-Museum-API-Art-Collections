import request from 'superagent'
const serverURL = 'http://localhost:3000/api/v1'

// *** EXAMPLE ***
// export function getWelcome() {
//   return request
//     .get(`${serverURL}/welcome`)
//     .then(response => response.body)
// }
// ***   ***   ***

export function getDepartment() {
  return request
    .get('https://collectionapi.metmuseum.org/public/collection/v1/departments')
    .then(res => res.body)
    .catch(e => console.log(e))
}

export function getObjects() { // 'departmentIds' as a parameter??
  return request
    .get(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=1`)
    .then(res => res.body)
    .catch(e => console.log(e))
}

export function getObjectsbyDepartment(depId) {

  return request
    .get(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=painting&departmentId=${depId}`)
    .then(res => res.body)
    .catch(e => console.log(e))
}
