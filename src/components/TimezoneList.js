import Timezone from './Timezone'
import './TimezoneList.css'

function TimezoneList(props) {
  const timezones = props.timezones.map((timezone) => <Timezone timezone={timezone} />)
  return <div className="Timezone-list">{timezones}</div>
}

export default TimezoneList
