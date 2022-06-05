const axios = require('axios')

/**
 * @typedef {{
 *  project_search: string
 * }} Options
 * 
 * @param {Options} options 
 */
const searchProjectJPG = async (options) => {
  const requestOptions = {
    method: "GET",
    url: `https://server.jpgstoreapis.com/search/collections`,
    params: {
    nameQuery: options.project_search,
    verified: "should-be-verified",
    pagination: {},
    size: 5
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

module.exports = searchProjectJPG