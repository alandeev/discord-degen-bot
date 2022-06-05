const ALL_SUB_COMMANDS = require("./commands");

 module.exports = {
	name: "admin",
	description: 'Ping!',
	usage: 'put usage here',
	roles_permission: ["982909894497820713"],
	/**
	 * @description Executes when the command is called by command handler.
	 * @author Naman Vrati
	 * @param {import("discord.js").Message} message The Message Object of the command.
	 * @param {String[]} args The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
	 */
	execute(message, args) {
    if(args.length === 0) {
      return message.channel.send({ content: "Args enough" });
    }
		
    const [ subCommandName, ...newArgs ] = args

    const command = ALL_SUB_COMMANDS.find(command => command.name === subCommandName)
    if(!command) {
      return message.channel.send({ content: "Command not found" }); 
    }

    return command.execute(message, newArgs)
	},
};
