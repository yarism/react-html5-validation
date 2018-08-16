import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './navigation/Navigation';
import Student from './student/Student';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents() {
    return fetch('../studentData.json')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          students: data,
          isLoading: false
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <Router>
          <div className="app">
            <Navigation listItems={this.state.students} path={'/student/'}></Navigation>
            <div className="container">
              <div className="wrapper">
                <Switch>
                  <Route path="/" exact={true} render={() => <h1>Welcome overlord, choose your peon.</h1>} />
                  <Route path="/student/:studentId" component={Student} />
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      );
    }
    else {
      return (
        <div>Loading...</div>
      );
    }
  }
}

export default App;
