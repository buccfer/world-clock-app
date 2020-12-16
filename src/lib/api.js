import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000', // TODO: get from env variables.
  timeout: 5000
})

export async function fetchTimezones() {
  const res = await api.get('/timezones')
  return res.data.timezones
}

export async function selectTimezone(tzName) {
  await api.put(`/timezones/${tzName}`)
}

export async function unselectTimezone(tzName) {
  await api.delete(`/timezones/${tzName}`)
}