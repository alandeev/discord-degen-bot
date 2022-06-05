const moment = require('moment')

const getUnixHours = (hours) => {
  const currentUnixDate = moment().unix()
  const hoursUnixDate = moment().subtract(hours, 'hours',).unix()

  return currentUnixDate - hoursUnixDate
}

module.exports = getUnixHours