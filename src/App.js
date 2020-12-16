import { Component } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css'
import './App.css'
import TimezoneList from './components/TimezoneList'
import * as timezonesApi from './lib/api'

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
      const timezones = await timezonesApi.fetchTimezones()
      this.setState({ timezones })
    } catch (err) {
      // TODO: show error message to the user.
    }
  }

  async addSelection([selectedTimezone]) {
    if (!selectedTimezone || this.state.selectedTimezones.find(tz => tz.name === selectedTimezone.name)) {
      return
    }

    try {
      await timezonesApi.selectTimezone(selectedTimezone.name)
      this.setState((state) => ({
        selectedTimezones: state.selectedTimezones.concat(selectedTimezone)
      }))
    } catch (err) {
      // TODO: show error to user
    }
  }

  async removeSelection(removedTimezone) {
    try {
      await timezonesApi.unselectTimezone(removedTimezone.name)
      this.setState((state) => ({
        selectedTimezones: state.selectedTimezones.filter(tz => tz.name !== removedTimezone.name)
      }))
    } catch (err) {
      // TODO: show error 
    }
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
