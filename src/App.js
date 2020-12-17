import { Component } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import get from 'lodash.get'
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
      errorMessage: null,
      isLoading: false
    }
    this.addSelection = this.addSelection.bind(this)
    this.removeSelection = this.removeSelection.bind(this)
    this.clearError = this.clearError.bind(this)
  }

  async componentDidMount() {
    try {
      this.setState({ isLoading: true })

      const timezones = await timezonesApi.fetchTimezones()

      this.setState({
        timezones,
        isLoading: false
      })
    } catch (err) {
      this.setState({
        errorMessage: get(err, 'response.data.errorMessage', 'Unknown error') ,
        isLoading: false
      })
    }
  }

  async addSelection([selectedTimezone]) {
    if (!selectedTimezone || this.state.selectedTimezones.find(tz => tz.name === selectedTimezone.name)) {
      return
    }

    try {
      this.setState({ isLoading: true })

      await timezonesApi.selectTimezone(selectedTimezone.name)

      this.setState((state) => ({
        selectedTimezones: state.selectedTimezones.concat(selectedTimezone),
        isLoading: false
      }))
    } catch (err) {
      this.setState({
        errorMessage: 'Could not add the timezone',
        isLoading: false
      })
    }
  }

  async removeSelection(removedTimezone) {
    try {
      this.setState({ isLoading: true })

      await timezonesApi.unselectTimezone(removedTimezone.name)

      this.setState((state) => ({
        selectedTimezones: state.selectedTimezones.filter(tz => tz.name !== removedTimezone.name),
        isLoading: false
      }))
    } catch (err) {
      this.setState({
        errorMessage: 'Could not remove the timezone',
        isLoading: false
      })
    }
  }

  clearError() {
    this.setState({ errorMessage: null })
  }

  render() {
    return (
      <div className="app-container">
        <div className="container wrapper">
          <div className="row bot20">
            <div className="col-md-6 offset-md-3">
              <Alert variant="danger" show={!!this.state.errorMessage} dismissible={true} onClose={this.clearError}>
                {this.state.errorMessage}
              </Alert>
            </div>
          </div>
          <div className="row bot20">
            <div className="col-md-6 offset-md-3">
              <Typeahead
                id="timezone-typeahead"
                options={this.state.timezones}
                labelKey="name"
                size="large"
                placeholder="Search"
                clearButton={true}
                onChange={this.addSelection}
                isLoading={this.state.isLoading} />
            </div>
          </div>
          <TimezoneList timezones={this.state.selectedTimezones} onTimezoneRemoved={this.removeSelection} />
        </div>
      </div>
    )
  }
}

export default App;
