import React from 'react';
import { Button, Modal  } from 'react-bootstrap'
export default class ConfirmDeleteModal extends React.Component {

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
            <span>Are you sure you want to delete employee?</span>
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