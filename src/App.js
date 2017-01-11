import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Modal, Form, FormControl} from 'react-bootstrap'
import Client from './Client.js';
import FieldGroup  from './components/FieldGroup.js';
import ConfirmDeleteModal from './components/ConfirmDeleteModal.js';
import ViewEmployeeModal from './components/ViewEmployeeModal.js';
import EmployeeDataTable from './components/EmployeeDataTable.js';

const client = new Client();

class NewEditEmployeeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, employee: {}, mode: '' };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }
  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }
  // generic handle change function
  _handleChange(ev) {
    // create clone of employee object
    var employee =Object.assign({},  this.state.employee);
    // update specified key in the fields object using the input's name attribute
    employee[ev.target.name] = ev.target.value;
    this.setState({ employee: employee });
  }


  render() {
    return (

      <Modal show={this.state.showModal} onHide={this.close}>

        <Modal.Header closeButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <FieldGroup ControlId="formControlsFirstName"
              type="text"
              label="First Name:"
              placeholder="Enter text"
              helpTooltip="First Name"
              name="firstName"
              helpDescription="Enter Employee First Name." value={this.state.employee.firstName} onChange={this._handleChange} />

            <FieldGroup ControlId="formControlsSecondName"
              type="text"
              label="Last Name:"
              placeholder="Enter text"
              name="lastName"
              helpTooltip="Last Name"
              helpDescription="Enter Employee Last Name." value={this.state.employee.lastName} onChange={this._handleChange} />
            <FieldGroup ControlId="formControlsSecondName"
              type="email"
              label="Email"
              placeholder="Enter email"
              name="email"
              helpTooltip="Email"
              helpDescription="Enter Employee Email." value={this.state.employee.email} onChange={this._handleChange} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.props.onSaveEmployee}>Submit</Button>
          <Button onClick={this.close}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { employees: [], searchValue: '', showResetSearch: false };
    this.openNewEditEmployee = this.openNewEditEmployee.bind(this);
    this.openViewEmployee = this.openViewEmployee.bind(this);
    this.openDeleteEmployee = this.openDeleteEmployee.bind(this);  
        
    this.loadAllEmployee = this.loadAllEmployee.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchReset = this.handleSearchReset.bind(this);
    this.handleSaveEmployee = this.handleSaveEmployee.bind(this);
    this.handleDeleteEmployee = this.handleDeleteEmployee.bind(this);

  }

   loadAllEmployee() {
    client.loadAllEmployees('',(employees) => {
      this.setState({
        employees: employees,
         showResetSearch: false,
        searchValue: ''
      });
    });
  }
  componentDidMount() {
    this.loadAllEmployee();
  }
  openNewEditEmployee(e) {
    var employeeId = e.target.value;
    this.refs.NewEditEmployeeModal.state.employee = {};

    if (employeeId !== '') {
      this.refs.NewEditEmployeeModal.state.mode = 'edit';
      for (let i = 0; i < this.state.employees.length; i++) {
        if (this.state.employees[i].id === employeeId) {
          this.refs.NewEditEmployeeModal.state.employee = this.state.employees[i];
          break;
        }
      }
    } else {
      this.refs.NewEditEmployeeModal.state.mode = 'new';
    }
    this.refs.NewEditEmployeeModal.open();
  }
  openViewEmployee(e) {
    var employeeIndex = parseInt(e.target.value, 10);
    this.refs.EmployeeViewModal.state.employee = this.state.employees[employeeIndex];
    this.refs.EmployeeViewModal.open();
  }
  openDeleteEmployee(e) {
    var employeeId = e.target.value;
    this.refs.ConfirmDeleteModal.state.employeeId = employeeId;
    this.refs.ConfirmDeleteModal.open();
  }

  handleDeleteEmployee(e) {
    var employeeId = e.target.value;
    client.deleteEmployee(employeeId, (result) => {
      this.refs.ConfirmDeleteModal.close();
      this.loadAllEmployee();
    });
  }
  handleSaveEmployee(e) {
    var employeeObj = this.refs.NewEditEmployeeModal.state.employee;
    if (this.refs.NewEditEmployeeModal.state.mode === 'new') {
      client.saveNewEmployee(employeeObj, (result) => {
        this.refs.NewEditEmployeeModal.close();
        this.loadAllEmployee();
      });
    }
    else if (this.refs.NewEditEmployeeModal.state.mode === 'edit') {
      client.saveOldEmployee(employeeObj.id,employeeObj, (result) => {
        this.refs.NewEditEmployeeModal.close();
        this.loadAllEmployee();
      });
    }

  }
  handleSearchReset(e) {
    this.loadAllEmployee();
  }
  
  handleSearchChange(e) {
    var value = e.target.value;

    this.setState({
      searchValue: value,
    });

    if (value === '') {
      this.setState({
        employees: [],
        showResetSearch: false,
      });
    } else {
      this.setState({
        showResetSearch: true,
      });
    }
    client.loadAllEmployees(value, (employees) => {
      this.setState({
        employees: employees
      });
    });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>
            <img src={logo} className="App-logo" alt="logo" />
            React Employees CRUD
          </h2>
        </div>
        <div className="App-content">
          <FormControl type="text"
            placeholder="Search employee by name ..."

            value={this.state.searchValue}
            onChange={this.handleSearchChange}
            />

          {this.state.showResetSearch ? (
            <Button
              onClick={this.handleSearchReset}
              > Reset Search</Button>
          ) : ''
          }
          <EmployeeDataTable employees={this.state.employees}
            viewEmployee={this.openViewEmployee}
            editEmployee={this.openNewEditEmployee}
            deleteEmployee={this.openDeleteEmployee} />
          <Button
            bsStyle="primary"
            bsSize="small"
            onClick={this.openNewEditEmployee}>
            <i className="glyphicon glyphicon-plus"> </i>
            &nbsp;New Employee
          </Button>
          <NewEditEmployeeModal ref="NewEditEmployeeModal" onSaveEmployee={this.handleSaveEmployee} />
          <ViewEmployeeModal ref="EmployeeViewModal" />
          <ConfirmDeleteModal ref="ConfirmDeleteModal" onConfirmDeleteEmployee={this.handleDeleteEmployee} />
        </div >
      </div >
    );
  }
}