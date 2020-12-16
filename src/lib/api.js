import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_TIMEZONES_API_BASE_URL,
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