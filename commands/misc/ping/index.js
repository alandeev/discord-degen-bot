/**
 * @file Sample ping command
 * @author Naman Vrati
 * @since 1.0.0
 */

const getProjectJPG = require("../../../services/jpg-store/get-project");
const { getProjectByPolicyId } = require("../../utils/open-cnft/get-project-local-detail");
const listTransacionsByDate = require("../../utils/open-cnft/list-transactions-by-date");

module.exports = {
	name: "ping",

	/** You need to uncomment below properties if you need them. */
	//description: 'Ping!',
	//usage: 'put usage here',
	permissions: 'SEND_MESSAGES',
	roles_permission: ["981613217526743090"],
	//guildOnly: true,

	/**
	 * @description Executes when the command is called by command handler.
	 * @author Naman Vrati
	 * @param {import("discord.js").Message} message The Message Object of the command.
	 * @param {String[]} args The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
	 */

	async execute(message, args) {

		const project = getProjectByPolicyId("c56d4cceb8a8550534968e1bf165137ca41e908d2d780cc1402079bd")

		const transactions = await listTransacionsByDate({
			project_id: project.project_id,
			before_hours: 7
		})

		console.log(transactions)

		message.channel.send({ content: "Pong." });
	},
};
