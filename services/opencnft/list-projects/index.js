const axios = require('axios')

/**
 * @typedef {{
 *  window: string
 * }} Options
 * 
 * @param {Options} options 
 */
const listProjectsRank = async (options) => {
  const requestOptions = {
    method: "GET",
    url: `https://api.opencnft.io/1/rank`,
    params: {
      window: options.window
    }
  }

  try {
    const result = await axios(requestOptions)

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

module.exports = listProjectsRank