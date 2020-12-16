import { Component } from 'react'
import axios from 'axios'
import { Typeahead } from 'react-bootstrap-typeahead'
import unionBy from 'lodash.unionby'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css'
import './App.css'
import TimezoneList from './components/TimezoneList'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timezones: [],
      selectedTimezones: []
    }
    this.addSelection = this.addSelection.bind(this)
    this.removeSelection = this.removeSelection.bind(this)
  }

  async componentDidMount() {
    try {
      // TODO: move requests to the API to a lib.
      const response = await axios.get('http://localhost:5000/timezones')
      this.setState({
        timezones: response.data.timezones,
      })
    } catch (err) {
      // TODO: show error message to the user.
    }
  }

  addSelection([selectedTimezone]) {
    if (!selectedTimezone) return

    this.setState((state) => ({
      selectedTimezones: unionBy(state.selectedTimezones, [selectedTimezone], 'name')
    }))
  }

  removeSelection(removedTimezone) {
    this.setState((state) => ({
      selectedTimezones: state.selectedTimezones.filter(tz => tz.name !== removedTimezone.name)
    }))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Typeahead
            id="timezone-typeahead"
            options={this.state.timezones}
            labelKey="name"
            clearButton={true}
            onChange={this.addSelection} />

          <TimezoneList timezones={this.state.selectedTimezones} onTimezoneRemoved={this.removeSelection} />
        </header>
      </div>
    )
  }
}

export default App;
