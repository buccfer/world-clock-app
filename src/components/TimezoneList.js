import Timezone from './Timezone'

function TimezoneList(props) {
  const timezones = props.timezones.map(
    (tz) => (
      <div className="col-md-4 col-sm-1 bot10">
        <Timezone key={tz.name} timezone={tz} onTimezoneRemoved={props.onTimezoneRemoved} />
      </div>
    )
  )

  return <div className="row bot20">{timezones}</div>
}

export default TimezoneList
