import React from 'react';
import { Popover,HelpBlock,  FormGroup,Row, Col , OverlayTrigger, FormControl, ControlLabel } from 'react-bootstrap'

export default class FieldGroup extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus">
        <HelpBlock>{this.props.helpTooltip}</HelpBlock>
      </Popover>
    );
    return (
      <FormGroup>
      <Row>
        <Col sm={3}>
          <ControlLabel htmlFor={this.props.ControlId}>{this.props.label}</ControlLabel>
        </Col>        
        <Col sm={6}>
          <FormControl id={this.props.ControlId} type={this.props.type} placeholder={this.props.placeholder} name={this.props.name} value={this.props.value}  onChange={this.props.onChange}/>
          {this.props.helpDescription && <HelpBlock>{this.props.helpDescription}</HelpBlock>}
        </Col>
        <Col>
          {this.props.helpTooltip &&
            <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popoverHoverFocus}>
              <span className="glyphicon glyphicon-info-sign info-sign"></span>
            </OverlayTrigger>
          }
        </Col>
        </Row>
      </FormGroup>);
  }
}