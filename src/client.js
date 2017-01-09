
function searchEmployees(query, cb) {
  return fetch('api/employees?q='+query, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function loadAllEmployees(cb) {
  return fetch('api/employees/', {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function deleteEmployee(id,cb){
  return fetch('api/employees/'+id, {
      method:'delete'    
  }).then(checkStatus)
    .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

const Client ={ loadAllEmployees,searchEmployees,deleteEmployee };
export default Client;