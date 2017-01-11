import React from 'react';
import { Button, Table} from 'react-bootstrap'
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

export default class EmployeeDataTable extends React.Component {
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
    return employee;
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