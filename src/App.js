import React, { Component } from 'react';
//import request from 'superagent';
//import jsonp from "superagent-jsonp";
import logo from './logo.svg';
import './App.css';
import { Button, OverlayTrigger, Modal, Popover, FormGroup, FormControl, ControlLabel, HelpBlock, Table } from 'react-bootstrap'

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
class ConfirmDeleteModal extends React.Component{

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

  render (){
    return(
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
        <Button onClick={this.close}>Yes</Button>
          <Button onClick={this.close}>No</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
class AddEditEmployeeModal extends React.Component {
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
      <Modal show={this.state.showModal} container={this.props.container} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label>First Name: </label>
            <span></span>
            <label>Last Name: </label>
            <span></span>
            <label>Email</label>
            <span></span>
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
        <td>{this.props.employee.Id}</td>
        <td>{this.props.employee.FirstName}</td>
        <td>{this.props.employee.LastName}</td>
        <td>{this.props.employee.Email}</td>
        <td>
          <a href="#" className="btn">
            <span>View</span>
          </a>
          <a href="#" className="btn">
            <span className="glyphicon glyphicon-cog"></span>
          </a>
          <a href="#" className="btn">
            <span className="glyphicon glyphicon-trash"></span>
          </a>
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

    this.props.employees.forEach((employee) => {
      rows.push(<EmployeeDataRow employee={employee} key={employee.Id} />)
    });

    return (
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { employees: [] };
       this.openNewEmploye = this.openNewEmploye.bind(this);
  }
  componentDidMount() {
    this.setState({
      employees: [
        { Id: 1, FirstName: 'Adam', LastName: 'Smith', Email: 'adam.smith@mail.com' },
        { Id: 2, FirstName: 'Ahmed', LastName: 'mahmoud', Email: 'aly.mahmoud@mail.com' }
      ]
    });
  }
  openNewEmploye() {
    this.refs.EmployeeModal.open();
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React</h2>
        </div>
        <div className="App-content">
          <h2>Employees</h2>
         <form>
          <FormControl type="text" placeholder="Type Name of employee" />
          <Button onClick={this.search}>
            <span className="glyphicon glyphicon-search">
            </span>
            	&nbsp;Search
          </Button>
          </form>
          <EmployeeDataTable employees={this.state.employees} />
          <Button
            bsStyle="primary"
            bsSize="large"
            onClick={this.openNewEmploye}>
            <i className="glyphicon glyphicon-plus"> </i>
            	&nbsp;New Employee
          </Button>
          <AddEditEmployeeModal ref="EmployeeModal" />
          <ViewEmployeeModal ref="EmployeeViewModal" />
          <ConfirmDeleteModal ref="ConfirmDeleteModal" />
        </div>
      </div>
    );
  }
}