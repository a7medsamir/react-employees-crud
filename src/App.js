import React, { Component } from 'react';
//import request from 'superagent';
//import jsonp from "superagent-jsonp";
import logo from './logo.svg';
import './App.css';
import { Button, Modal, Form, FormGroup, FormControl, ControlLabel, HelpBlock, Table, Grid, Row, Col, PageHeader } from 'react-bootstrap'
import Client from './Client';
import FieldGroup from './components/FieldGroup.js';

const MATCHING_ITEM_LIMIT = 25;

class ConfirmDeleteModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showModal: false, employeeId: '' };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }
  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <Modal show={this.state.showModal} container={this.props.container} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <span>Are you sure you want to delete employee ?</span>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.props.onConfirmDeleteEmployee} value={this.state.employeeId}>Yes</Button>
          <Button onClick={this.close}>No</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
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
    // create clone of fields object using ES6 spread operator
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
class ViewEmployeeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, employee: {} };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }
  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <Modal show={this.state.showModal} container={this.props.container} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form horizontal>
            <Row>
              <Col sm={3}>
                <ControlLabel>Id: </ControlLabel>
              </Col>
              <Col>
                <FormControl.Static>
                  {this.state.employee.id}
                </FormControl.Static>
              </Col>
            </Row>

            <Row>
              <Col sm={3}>
                <ControlLabel>First Name: </ControlLabel>
              </Col>
              <Col>
                <FormControl.Static>
                  {this.state.employee.firstName}
                </FormControl.Static>
              </Col>
            </Row>
            <Row>
              <Col sm={3}>
                <ControlLabel>Last Name: </ControlLabel>
              </Col>
              <Col>
                <FormControl.Static>{this.state.employee.lastName}</FormControl.Static>
              </Col>
            </Row>

            <Row>
              <Col sm={3}>
                <ControlLabel>Email</ControlLabel>
              </Col>
              <Col>
                <FormControl.Static>{this.state.employee.email}</FormControl.Static>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
class EmployeeDataRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.employee.id}</td>
        <td>{this.props.employee.firstName}</td>
        <td>{this.props.employee.lastName}</td>
        <td>{this.props.employee.email}</td>
        <td>
          <Button bsStyle="link" onClick={this.props.view} value={this.props.employeeIndex}>
            View
          </Button>
          <Button bsStyle="link" onClick={this.props.edit} value={this.props.employee.id}>
            edit
          </Button>
          <Button bsStyle="link" onClick={this.props.delete} value={this.props.employee.id}>
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}
class EmployeeDataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { employees: [] };
  }
  componentDidMount() {
  }
  render() {
    var rows = [];

    this.props.employees.map((employee, employeeIndex) => {
      rows.push(<EmployeeDataRow employee={employee} key={employee.id} view={this.props.viewEmployee} edit={this.props.editEmployee} delete={this.props.deleteEmployee} employeeIndex={employeeIndex} />)
    });

    return (
      <Table responsive striped bordered condensed hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ?
            (rows)
            : (<tr ><td colSpan={5}>No Data Found</td></tr>)
          }
        </tbody>
      </Table>
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
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchReset = this.handleSearchReset.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.loadAllEmployee = this.loadAllEmployee.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
  }
  componentDidMount() {
    Client.loadAllEmployees((employees) => {
      this.setState({
        employees: employees
      });
    });
  }
  openNewEditEmployee(e) {
    var employeeId = e.target.value;
    this.refs.NewEditEmployeeModal.state.employee = {};

    if (employeeId != '') {
      this.refs.NewEditEmployeeModal.state.mode = 'edit';
      for (let i = 0; i < this.state.employees.length; i++) {
        if (this.state.employees[i].id == employeeId) {
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

  deleteEmployee(e) {
    var employeeId = e.target.value;
    Client.deleteEmployee(employeeId, (result) => {
      this.refs.ConfirmDeleteModal.close();
      this.loadAllEmployee();
    });
  }
  saveEmployee(e) {
    var employeeObj = this.refs.NewEditEmployeeModal.state.employee;
    if (this.refs.NewEditEmployeeModal.state.mode == 'new') {
      Client.saveNewEmployee(employeeObj, (result) => {
        this.refs.NewEditEmployeeModal.close();
        this.loadAllEmployee();
      });
    }
    else if (this.refs.NewEditEmployeeModal.state.mode == 'edit') {
      Client.saveOldEmployee(employeeObj.id,employeeObj, (result) => {
        this.refs.NewEditEmployeeModal.close();
        this.loadAllEmployee();
      });
    }

  }

  handleSearchReset(e) {
    Client.loadAllEmployees((employees) => {
      this.setState({
        employees: employees,
        showResetSearch: false,
        searchValue: ''
      });
    });
  }
  loadAllEmployee() {
    Client.loadAllEmployees((employees) => {
      this.setState({
        employees: employees,
      });
    });
  }


  handleSearchChange(e) {
    const value = e.target.value;

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
    Client.searchEmployees(value, (employees) => {
      this.setState({
        employees: employees.slice(0, MATCHING_ITEM_LIMIT),
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
          <NewEditEmployeeModal ref="NewEditEmployeeModal" onSaveEmployee={this.saveEmployee} />
          <ViewEmployeeModal ref="EmployeeViewModal" />
          <ConfirmDeleteModal ref="ConfirmDeleteModal" onConfirmDeleteEmployee={this.deleteEmployee} />
        </div >
      </div >
    );
  }
}