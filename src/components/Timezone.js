import { Component } from 'react'
import './Timezone.css'

class Timezone extends Component {
  render() {
    return (
      <div className="Timezone-box">
        <span className="Remove" onClick={() => this.props.onTimezoneRemoved(this.props.timezone)}>x</span>
        <div className="Timezone-name">{this.props.timezone.name}</div>
        <span>{this.props.timezone.localTime}</span>
      </div>
    )
  }
}

export default Timezone
