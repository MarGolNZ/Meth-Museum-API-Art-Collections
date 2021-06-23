import request from 'superagent'

const serverURL = 'http://localhost:3000/api/v1'

// *** EXAMPLE ***
// export function getWelcome() {
//   return request
//     .get(`${serverURL}/welcome`)
//     .then(response => response.body)
// }
// ***   ***   ***
export function getObjectIds() {
  return request
    .get('https://collectionapi.metmuseum.org/public/collection/v1/objects')
    .then(res => res.body)
    .catch(e => console.log(e))
}