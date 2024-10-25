import './App.css';
import React from 'react';
import TopPanel from '../src/components/topPanel/topPanel';
import BottomPanel from '../src/components/bottomPanel/bottomPanel';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenRegWindow: JSON.parse(localStorage.getItem('isOpenRegWindow')),
      registerAnswers: false,
    };
    this.handleRegistrationSuccess = this.handleRegistrationSuccess.bind(this);
  }
  handleRegistrationSuccess() {
    this.setState({ isOpenRegWindow: true, registerAnswers: false });
  }
  handleRegistrationButton() {
    if(this.state.isOpenRegWindow){

    }
  }
  render() {
    return (
      <div className="App">
        <TopPanel/>
        <BottomPanel onSuccess={this.handleRegistrationSuccess} statusCheck ={this.state} />
      </div>
    );
  }
}

export default App;
