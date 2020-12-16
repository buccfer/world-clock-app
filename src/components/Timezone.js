import { Component } from 'react'
import './Timezone.css'

class Timezone extends Component {
  render() {
    return (
      <div className="Timezone-box">
        <div className="Timezone-name">{this.props.name}</div>
        <span>{this.props.localTime}</span>
      </div>
    )
  }
}

export default Timezone
