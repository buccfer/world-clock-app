import Timezone from './Timezone'
import './TimezoneList.css'

function TimezoneList(props) {
  const timezones = props.timezones.map((timezone) => <Timezone key={timezone.name} timezone={timezone} />)
  return <div className="Timezone-list">{timezones}</div>
}

export default TimezoneList
