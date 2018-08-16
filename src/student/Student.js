import React, { Component } from 'react';
import { debounce } from 'throttle-debounce';
import Input from '../components/forms/Input';
import Saving from '../components/utils/Saving';
import './Student.css';

class Student extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true };
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = debounce(1000, this.validateForm.bind(this));
    this.saveStudent = this.saveStudent.bind(this);
    this.form = React.createRef();
    this.today = new Date().toISOString().split("T")[0];
  }

  componentDidMount() {
    this.fetchStudent();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.studentId) {
      this.fetchStudent();
    }
  }

  fetchStudent() {
    return fetch('../studentData.json')
      .then((res) => res.json())
      .then((data) => {
        const currentStudent = data.find(student => student.id === this.props.match.params.studentId);
        currentStudent.name = currentStudent.firstName + ' ' + currentStudent.lastName;
        currentStudent.enrollmentDate = currentStudent.enrollmentDate.substring(0, 10);
        currentStudent.dateOfBirth = currentStudent.dateOfBirth.substring(0, 10);
        this.setState({
          currentStudent: currentStudent,
          isLoading: false
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleChange(event) {
    let currentStudent = Object.assign({}, this.state.currentStudent); 
    currentStudent[event.target.name] = event.target.value;
    this.setState({currentStudent});
  }

  validateForm() {
    const form = this.form.current;
    form.reportValidity();
    form.checkValidity();
    if (form.checkValidity()) {
      this.saveStudent();
    }
  }
  
  saveStudent() {
    this.setState({ savingStudent: true });

    // Faking save post, veeery slow :)
    setTimeout(function() { 
      this.setState({ savingStudent: false });
    }.bind(this), 3000);

  }

  render() {
    if (!this.state.isLoading) {
      return (
        <React.Fragment>
          <h1>Student Job Outcome Details for</h1>
          <div className="banner" style={{ backgroundImage: `url(${this.state.currentStudent.bannerUrl})` }}>
            <span className="banner__headline">{this.state.currentStudent.name}</span>
          </div>
          <form style={{ display: 'grid', gridTemplateColumns: '45% 45%', gridColumnGap: '10%', gridRowGap: '40px' }}onChange={this.validateForm} ref={this.form}>
            <Input label={'Student number'} name={'id'} value={this.state.currentStudent.id} onChange={this.handleChange} required={true}></Input>
            <Input label={'Student name'} name={'name'} value={this.state.currentStudent.name} onChange={this.handleChange} required={true}></Input>
            <Input type={'email'} label={'Email'} name={'email'} value={this.state.currentStudent.email} onChange={this.handleChange} required={true}></Input>
            <Input type={'tel '} label={'Phone number'} name={'telephone'} value={this.state.currentStudent.telephone} onChange={this.handleChange} required={true} pattern={'(?:\\(\\d{3}\\)|\\d{3})[- ]?\\d{3}[- ]?\\d{4}$'}></Input>
            <Input type={'date'} label={'Enrollment date'} name={'enrollmentDate'} value={this.state.currentStudent.enrollmentDate} onChange={this.handleChange} max={this.today}></Input>
            <Input type={'date'} label={'Date of birth'} name={'dateOfBirth'} value={this.state.currentStudent.dateOfBirth} onChange={this.handleChange} max={this.today}></Input>
            <Input label={'Previous occupation'} name={'previousOccupdation'} value={this.state.currentStudent.previousOccupation} onChange={this.handleChange}></Input>
          </form>
          <ul>
          {this.state.currentStudent.outcomes.map((outcome) => {
            return (
              <li style={{ color: 'white' }} key={outcome.id}>
                  {outcome.jobTitle}@{outcome.employerName}
              </li>
            )
          })}
          </ul>
          {this.state.savingStudent &&
            <Saving></Saving>
          }
        </React.Fragment>
      );
    }
    else {
      return (
        <div>fetching student</div>
      );
    }

  }
}

export default Student;