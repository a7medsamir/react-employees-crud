
const apiURL = 'api/employees';

function loadAllEmployees(query,cb) {
var fullUrl= buildQuery(apiURL,query);
return fetch(fullUrl, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function buildQuery(url,query){
  if(query!=null && query!==''){
    return url +'?q='+ query;
  }
  return url;
}

function deleteEmployee(id, cb) {
  return fetch(apiURL+'/' + id, {
    method: 'delete'
  }).then(checkStatus)
    .then(cb);
}

function saveNewEmployee(obj, cb) {
  return fetch(apiURL+'/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }).then(checkStatus)
    .then(cb);
}
function saveOldEmployee(id,obj, cb) {
  return fetch(apiURL+'/'+id, {
    method: 'PUT',
   headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
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

const Client = { loadAllEmployees, deleteEmployee, saveNewEmployee, saveOldEmployee };
export default Client;