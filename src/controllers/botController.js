const Bot = require("../models/bot")

class BotController {
  constructor(processor, logger) {
    this.processor = processor
    this.logger = logger
    this.nextId = 1
  }

  addBot() {
    const bot = new Bot(this.nextId++, this.logger)
    this.processor.addBot(bot)
  }

  removeBot() {
    this.processor.removeBot()
  }
}

module.exports = BotController