import { Component } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import Alert from 'react-bootstrap/Alert'
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
      selectedTimezones: [],
      errorMessage: null
    }
    this.addSelection = this.addSelection.bind(this)
    this.removeSelection = this.removeSelection.bind(this)
  }

  async componentDidMount() {
    try {
      const timezones = await timezonesApi.fetchTimezones()
      this.setState({ timezones })
    } catch (err) {
      this.setState({
        errorMessage: err.response.data.errorMessage
      })
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
      this.setState({
        errorMessage: 'Could not add the timezone'
      })
    }
  }

  async removeSelection(removedTimezone) {
    try {
      await timezonesApi.unselectTimezone(removedTimezone.name)
      this.setState((state) => ({
        selectedTimezones: state.selectedTimezones.filter(tz => tz.name !== removedTimezone.name)
      }))
    } catch (err) {
      this.setState({
        errorMessage: 'Could not remove the timezone'
      })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Alert variant="danger" show={!!this.state.errorMessage} dismissible={true}>
            {this.state.errorMessage}
          </Alert>

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
