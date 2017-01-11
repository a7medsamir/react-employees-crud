import React from 'react';
import { Button, Modal,Form, Row, Col ,  FormControl, ControlLabel  } from 'react-bootstrap'

export default class ViewEmployeeModal extends React.Component {
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
          <Modal.Title>Employee View Details</Modal.Title>
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