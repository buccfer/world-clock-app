import { Component } from 'react'
import axios from 'axios'
import './App.css';
import TimezoneList from './components/TimezoneList'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timezones: [],
      selectedTimezones: []
    }
  }

  async componentDidMount() {
    try {
      // TODO: move requests to the API to a lib.
      const response = await axios.get('http://localhost:5000/timezones')
      this.setState({
        timezones: response.data.timezones,
        selectedTimezones: response.data.timezones.slice(0, 3)
      })
    } catch (err) {
      // TODO: show error message to the user.
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <TimezoneList timezones={this.state.selectedTimezones} />
        </header>
      </div>
    )
  }
}

export default App;
