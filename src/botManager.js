const Bot = require("./bot")

class BotManager {

  constructor(queue, logger) {
    this.queue = queue
    this.logger = logger
    this.bots = []
    this.nextId = 1
  }

  addBot() {

    const bot = new Bot(this.nextId++, this.queue, this.logger)

    this.bots.push(bot)

    this.logger.log(`Bot #${bot.id} created - Status: ACTIVE`)

    bot.start()
  }

  removeBot() {

    const bot = this.bots.pop()

    if (!bot) return

    bot.stop()
  }

  notifyBots() {

    this.bots.forEach(bot => {

      if (!bot.order) {
        bot.process()
      }

    })

  }

  activeBots() {
    return this.bots.length
  }

}

module.exports = BotManager