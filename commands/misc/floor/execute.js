const { prefix } = require("../../../config.json");
const moment = require('moment')

const { MessageEmbed } = require("discord.js");
const searchProjectJPG = require("../../../services/jpg-store/search-project");
const getProjectJPG = require("../../../services/jpg-store/get-project");
const { replyMessage, sendMessage } = require("../../utils/messages");
const getProjectFloorPriceList = require("../../../services/opencnft/get-floor-price-list");
const { getProjectByPolicyId } = require("../../utils/open-cnft/get-project-local-detail");
const listTransacionsByDate = require("../../utils/open-cnft/list-transactions-by-date");

const lovelaceToAda = (value) => (Number(value) / 1000000)

const SECONDS_TO_DELETE = 30 * 1000
const TRANSACTIONS_BEFORE_HOURS = 24

/**
 * @description Executes when the command is called by command handler.
 * @author Naman Vrati
 * @param {import("discord.js").Message} message The Message Object of the command.
 * @param {String[]} args The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
 */

async function execute(message, args) {
  const { commands } = message.client;

  if (!args.length) {
    let helpEmbed = new MessageEmbed()
      .setColor(0x4286f4)
      .setTitle("Error")
      .setDescription("Command is invalid")
      .addField("Usage", `${prefix}floor <policy_id/project_name>`);

    return sendMessage({ embeds: [helpEmbed] }, SECONDS_TO_DELETE)
  }

  const searchDetail = args.join(' ').toLowerCase()

  const resultSearchProject = await searchProjectJPG({
    project_search: searchDetail
  })

  if(!resultSearchProject.status) {
    let commandEmbed = new MessageEmbed()
    .setColor(0x4286f4)
    .setTitle("Project not found");

    return replyMessage(message, { embeds: [commandEmbed] }, SECONDS_TO_DELETE)
  }

  const [ firstProject ] = resultSearchProject.data.collections
  if(!firstProject) {
    let commandEmbed = new MessageEmbed()
    .setColor(0x4286f4)
    .setTitle("Project not found");

    return replyMessage(message, { embeds: [commandEmbed] }, SECONDS_TO_DELETE)
  }

  const resultProjectDetails = await getProjectJPG({
    policy_id: firstProject.policy_id,
    size: 5
  })

  const projectTokens = resultProjectDetails.data.tokens

  const floorList = projectTokens.map(token => lovelaceToAda(token.listing_lovelace))
  
  const project = getProjectByPolicyId(firstProject.policy_id)

  const lastTransactions = await listTransacionsByDate({
    project_id: project.project_id,
    before_hours: TRANSACTIONS_BEFORE_HOURS
  })

  const totalTransactions = lastTransactions.length

  const transactionsByPrice = [...lastTransactions].sort((a, b) => a.price - b.price).reverse()

  const minSalePrice = transactionsByPrice[transactionsByPrice.length-1]
  const maxSalePrice = transactionsByPrice[0]

  lastTransactions.length = 5
  const lastFiveTransactions = lastTransactions.map(tx => {
    const beforeHoursMessage = moment(tx.sold_at).fromNow(true)
    return `${tx.price} ADA ( ${beforeHoursMessage} )`
  })

  const resultFloorPriceList = await getProjectFloorPriceList({
    project_id: project.project_id,
    granularity: "daily",
    time: "7d"
  })

  const floorPriceListFive = resultFloorPriceList.data.floorPrices
  floorPriceListFive.length = 5

  const floorPriceList = floorPriceListFive.map(floorPrice => {
    return `${floorPrice.floor_price} ADA ( ${floorPrice.granularity} )`
  })

  let commandEmbed = new MessageEmbed()
  .setColor(0x4286f4)
  .setTitle(firstProject.display_name);

  commandEmbed.addField('Policy id', firstProject.policy_id)

  commandEmbed.addField('Floor ( current )', floorList.join(', '))

  commandEmbed.addField('Last Sale ( Total )', `**${totalTransactions}** in **${TRANSACTIONS_BEFORE_HOURS} hours**`, true)
  commandEmbed.addField('Last Sale ( Min )', `${minSalePrice.price} ADA`, true)
  commandEmbed.addField('Last Sale ( Max )', `${maxSalePrice.price} ADA`, true)

  commandEmbed.addField(`Last Sales ( daily )`, lastFiveTransactions.join("\n"), true)
  commandEmbed.addField('Floor ( per day )', floorPriceList.join('\n'), true)

  return replyMessage(message, { embeds: [commandEmbed] }, SECONDS_TO_DELETE)
}

module.exports = execute