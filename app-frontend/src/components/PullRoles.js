import React, { Component } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import "../App.css";

class PullRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comitId: "",
      searchHead: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  };

  submitForm(e) {
    e.preventDefault();
    alert(`User with comit-id ${this.state.comitId} on splunk UI ${this.state.searchHead}, has these roles : !`)
    // console.log(`Day: ${this.state.day}`);
  }

  render() {
    const {comitId, searchHead} = this.state;

    return (
      <div className="subComponent-lg" id="pathingBody">
        <Container>
          <header className="headerTitle text-center">
            <h1>Mimic a User's Access</h1>
            <p>Search what roles and indexes a user has access to !</p>
          </header>
          <Form className="form" onSubmit={(e) => this.submitForm(e)}>
            <FormGroup>
              <Label>
                Comit-ID
              </Label>
              <Input
                id="exampleTime"
                name="comitId"
                placeholder="enter comit-ID here"
                type="text"
                value={comitId}
                onChange={(e) => this.handleChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label>
                Permit Type
              </Label>
              <Input
                id="exampleSelect"
                name="searchHead"
                type="select"
                value={searchHead}
                onChange={(e) => this.handleChange(e)}
              >
                <option>
                  Splunk-Apps
                </option>
                <option>
                  Splunk-AdHoc
                </option>
                <option>
                  Splunk-ES
                </option>
              </Input>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default PullRoles;
