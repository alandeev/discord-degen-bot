const listProjectTransactions = require("../../../../services/opencnft/list-project-transactions")
const moment = require('moment')
const getUnixHours = require("../../moment/get-unix-hours")

/**
 * @typedef {{
 *  project_id: string,
 *  before_hours?: number
 * }} Options
 * 
 * @param {Options} options 
 */
const listTransacionsByDate = async (options) => {
  let currentPage = 1

  const allTransactions = []

  const beforeHoursUnix = getUnixHours(options.before_hours)

  while(true){
    const resultTransactions = await listProjectTransactions({
      project_id: options.project_id,
      order: "date",
      page: currentPage,
      order_direction: true
    })

    const transactions = resultTransactions.data.items
    if(transactions.length === 0) {
      return allTransactions
    }

    const transactionsFilted = transactions.filter(tx => {
      const soldDate = moment(tx.sold_at)
      .subtract(3, 'hours')
      .unix()
  
      const currentDate = moment().unix()

      const soldUnixDate  = (currentDate - soldDate)

      return beforeHoursUnix >= soldUnixDate
    })

    if(transactionsFilted.length === 0) {
      return allTransactions
    }

    allTransactions.push(...transactionsFilted)

    currentPage++
  }
}

module.exports = listTransacionsByDate