import React, { Component } from 'react';
//import request from 'superagent';
//import jsonp from "superagent-jsonp";
import logo from './logo.svg';
import './App.css';
import { Button, OverlayTrigger, Modal, Popover, FormGroup, FormControl, ControlLabel, HelpBlock, Table, Grid, Row, Col, PageHeader } from 'react-bootstrap'
import Client from './Client';


const MATCHING_ITEM_LIMIT = 25;

class FieldGroup extends React.Component {
  render() {
    const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus">
        <HelpBlock>{this.props.help}</HelpBlock>
      </Popover>
    );
    return (
      <FormGroup id={this.props.ControlId}>

        <ControlLabel>{this.props.label}</ControlLabel>

        <FormControl type={this.props.type} placeholder={this.props.placeholder} />
        {this.props.help &&
          <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popoverHoverFocus}>
            <span className="glyphicon glyphicon-info-sign info-sign"></span>
          </OverlayTrigger>
        }
      </FormGroup>);
  }
}
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
    this.state = { showModal: false };
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
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FieldGroup ControlId="formControlsFirstName"
              type="text"
              label="First Name:"
              placeholder="Enter text"
              help="Enter Employee First Name." />
            <FieldGroup ControlId="formControlsSecondName"
              type="text"
              label="Last Name:"
              placeholder="Enter text"
              help="Enter Employee Last Name." />
            <FieldGroup ControlId="formControlsSecondName"
              type="email"
              label="Email"
              placeholder="Enter email"
              help="Enter Employee Email." />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.save}>Submit</Button>
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
          <form>
            <label>Id: </label>
            <span>{this.state.employee.id}</span>
            <br />
            <label>First Name: </label>
            <span>{this.state.employee.firstName}</span>
            <br />
            <label>Last Name: </label>
            <span>{this.state.employee.lastName}</span>
            <br />
            <label>Email</label>
            <span>{this.state.employee.email}</span>
          </form>
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
          <Button bsStyle="link" onClick={this.props.edit} value={this.props.employeeIndex}>
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
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {rows.length>0 ? 
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
    this.loadAllEmployee=this.loadAllEmployee.bind(this);
  }
  componentDidMount() {
    Client.loadAllEmployees((employees) => {
      this.setState({
        employees: employees
      });
    });
  }


  openNewEditEmployee(e) {
    this.refs.EmployeeModal.open();
  }
  openViewEmployee(e) {
    debugger;
    var employeeIndex = parseInt(e.target.value, 10);

    //var employee = this.state.employees.splice(employeeIndex, 1);
    this.refs.EmployeeViewModal.state.employee = this.state.employees[employeeIndex];

    this.refs.EmployeeViewModal.open();
  }
  openDeleteEmployee(e) {
    debugger;
    var employeeId = e.target.value;
    this.refs.ConfirmDeleteModal.state.employeeId = employeeId;
    this.refs.ConfirmDeleteModal.open();
  }

  deleteEmployee(e) {
    debugger;
    var employeeId = e.target.value;
   Client.deleteEmployee(employeeId,(result)=>{
      this.refs.ConfirmDeleteModal.close();
     debugger;
      this.loadAllEmployee();
   });


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
loadAllEmployee(){
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
          <div className="row">
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
          </div>
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


          <NewEditEmployeeModal ref="EmployeeModal" />
          <ViewEmployeeModal ref="EmployeeViewModal" />
          <ConfirmDeleteModal ref="ConfirmDeleteModal" onConfirmDeleteEmployee={this.deleteEmployee} />
        </div >
      </div >
    );
  }
}