const axios = require('axios')

/**
 * @typedef {{
 *  policy_id: string,
 *  size: number
 * }} Options
 * 
 * @param {Options} options 
 */
const getProjectJPG = async (options) => {
  const requestOptions = {
    method: "GET",
    url: `https://server.jpgstoreapis.com/search/tokens`,
    params: {
      policyIds: JSON.stringify([options.policy_id]),
      saleType: "default",
      sortBy: "price-low-to-high",
      traits: JSON.stringify({}),
      verified: "default",
      pagination: JSON.stringify({}),
      size: options.size,
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

module.exports = getProjectJPG