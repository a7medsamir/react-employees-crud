import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, OverlayTrigger, Modal, Popover, Tooltip, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'


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


export default class App extends Component {
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
    const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus" title="Popover bottom">
        <strong>Holy guacamole!</strong> Check this info.
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React</h2>
        </div>
        <div className="App-content">
          <h2>Employees</h2>
          <FormControl type="text" placeholder="Type Name of employee" />
          <Button onClick={this.search}>
            <span className="glyphicon glyphicon-search">
            </span>
            Search
   </Button>
          <table className="table">
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
              <tr>
                <td>
                  1
                </td>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
                <td>
                  <a href="#" className="btn btn-info">
                    <span>View</span>
                  </a>
                  <a href="#" className="btn btn-info">
                    <span className="glyphicon glyphicon-cog"></span>
                  </a>
                  <a href="#" className="btn btn-info">
                    <span className="glyphicon glyphicon-trash"></span>
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  2
                </td>
                <td>Mary</td>
                <td>Moe</td>
                <td>mary@example.com</td>
                <td>
                  <a href="#" className="btn btn-info">
                    <span>View</span>
                  </a>
                  <a href="#" className="btn btn-info">
                    <span className="glyphicon glyphicon-cog"></span>
                  </a>
                  <a href="#" className="btn btn-info">
                    <span className="glyphicon glyphicon-trash"></span>
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  3
                </td>
                <td>July</td>
                <td>Dooley</td>
                <td>july@example.com</td>
                <td>
                  <a href="#" className="btn btn-info">
                    <span>View</span>
                  </a>
                  <a href="#" className="btn btn-info">
                    <span className="glyphicon glyphicon-cog"></span>
                  </a>
                  <a href="#" className="btn btn-info">
                    <span className="glyphicon glyphicon-trash"></span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <Button
            bsStyle="primary"
            bsSize="large"
            onClick={this.open}>
            New Employee
          </Button>
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
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.save}>Save</Button>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}