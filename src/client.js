

const apiURL = 'api/employees';

export default class Client {
  
  loadAllEmployees(query, cb) {
    var fullUrl = this.buildQuery(apiURL, query);
    return fetch(fullUrl, {
      accept: 'application/json',
    }).then(this.checkStatus)
      .then(this.parseJSON)
      .then(cb);
  }
  

  deleteEmployee(id, cb) {
    return fetch(apiURL + '/' + id, {
      method: 'delete'
    }).then(this.checkStatus)
      .then(cb);
  }

  saveNewEmployee(obj, cb) {
    return fetch(apiURL + '/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(this.checkStatus)
      .then(cb);
  }
  saveOldEmployee(id, obj, cb) {
    return fetch(apiURL + '/' + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(this.checkStatus)
      .then(cb);
  }


   buildQuery(url, query) {
    if (query != null && query !== '') {
      return url + '?q=' + query;
    }
    return url;
  }

  checkStatus(response) {
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

  parseJSON(response) {
    return response.json();
  }
}