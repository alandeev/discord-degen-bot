const replyMessage = async (message, options = {}, seconds_to_delete = null) => {
  const resultMessage = await message.reply(options)
  try{
    if(seconds_to_delete) {
      setTimeout(() => resultMessage.delete(), seconds_to_delete)
    }
  }catch(error) {
    console.error(error)
  }
  
  return resultMessage
}

const sendMessage = async (message, options = {}, seconds_to_delete = null) => {
  const resultMessage = await message.channel.send(options)
  try{
    if(seconds_to_delete) {
      setTimeout(() => resultMessage.delete(), seconds_to_delete)
    }
  } catch(error) {
    console.error(error)
  }

  return resultMessage
}

module.exports = {
  replyMessage,
  sendMessage
}