const execute = require("./execute");

module.exports = {
	name: "floor",
	description: "List all commands of bot or info about a specific command.",
	aliases: ["<policy_id>"],
	usage: "[command name]",
	cooldown: 5,
  execute
};
