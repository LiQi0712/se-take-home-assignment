class OrderProcessor {

  constructor(logger) {

    this.logger = logger

    this.vip = []
    this.normal = []

    this.bots = []
  }

  addOrder(order) {

    if (order.type === "VIP") {
      this.vip.push(order)
    } else {
      this.normal.push(order)
    }

    this.dispatch()

  }

  addBot(bot) {

    this.bots.push(bot)

    this.logger.log(`Bot #${bot.id} created`)

    this.dispatch()

  }

  removeBot() {

    const bot = this.bots.pop()

    if (!bot) return

    this.logger.log(`Bot #${bot.id} removed`)

  }

  nextOrder() {

    if (this.vip.length) return this.vip.shift()
    if (this.normal.length) return this.normal.shift()

    return null

  }

  dispatch() {

    this.bots.forEach(bot => {

      if (bot.order) return

      const order = this.nextOrder()

      if (!order) return

      bot.process(order, () => {

        this.dispatch()

      })

    })

  }

}

module.exports = OrderProcessor