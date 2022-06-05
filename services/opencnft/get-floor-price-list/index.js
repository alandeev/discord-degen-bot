const axios = require('axios')
const api = require('../api')

/**
 * @typedef {{
 *  project_id: string,
 *  granularity: string,
 *  time: string
 * }} Options
 * 
 * @param {Options} options 
 */
const getProjectFloorPriceList = async (options) => {
  const requestOptions = {
    method: "POST",
    url: `https://api.opencnft.io/project/${options.project_id}/floor_price`,
    data: {
      granularity: options.granularity,
      time: options.time
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

module.exports = getProjectFloorPriceList