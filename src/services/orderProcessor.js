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

    if (bot.order) {
      this.returnOrder(bot.order)
    }

    bot.stop()

    this.logger.log(`Bot #${bot.id} removed`)
  }

  returnOrder(order) {
    order.status = "PENDING"
    if (order.type === "VIP") this.vip.unshift(order)
    else this.normal.unshift(order)
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