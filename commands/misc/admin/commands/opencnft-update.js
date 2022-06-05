const fs = require('fs/promises')
const listProjectsOpenCNFT = require("../../../../services/opencnft/list-projects");



/**
 * @description Executes when the command is called by command handler.
 * @author Naman Vrati
 * @param {import("discord.js").Message} message The Message Object of the command.
 * @param {String[]} args The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
 */
async function execute(message, args) {

  const argTypeSearch = "all"

  const resultProjectsCNFT = await listProjectsOpenCNFT({
    window: argTypeSearch
  })

  const projects = resultProjectsCNFT.data

  await fs.writeFile('storage/opencnft-projects.json', JSON.stringify(projects.ranking))
  
  return message.channel.send({ content: "OPEN CNFT." });
}

 module.exports = execute