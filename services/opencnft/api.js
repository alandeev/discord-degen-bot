const { default: axios } = require('axios')

const api = axios.create({
  baseURL: "https://api.opencnft.io",
  headers: {
    "Host": "api.opencnft.io",
    "accept": "application/json, text/plain, */*",
    "accept-encoding": "gzip, deflate, br",
    "content-type": "application/json",
    "origin": "https://opencnft.io",
    "referer": "https://opencnft.io/",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
  }
})

module.exports = api