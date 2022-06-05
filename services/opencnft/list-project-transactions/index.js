const axios = require('axios')
const api = require('../api')

/**
 * @typedef {{
 *  project_id: string,
 *  page: string,
 *  order: string,
 *  order_direction: boolean
 * }} Options
 * 
 * @param {Options} options 
 */
const listProjectTransactions = async (options) => {
  const requestOptions = {
    method: "POST",
    url: `https://api.opencnft.io/project/${options.project_id}/tx`,
    data: {
      page: options.page,
      order: options.order,
      order_direction: options.order_direction
    }
  }

  try {
    const result = await api(requestOptions)

    return {
      status: true,
      data: result.data
    }
  } catch(error) {
    console.error(error)

    return {
      status: false,
      data: error.response.data
    }
  }
}

module.exports = listProjectTransactions