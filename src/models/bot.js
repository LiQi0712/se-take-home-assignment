class Bot {
  constructor(id, logger) {
    this.id = id
    this.logger = logger
    this.order = null
    this.timer = null
  }

  process(order, callback) {
    this.order = order
    order.status = "PROCESSING"
    this.logger.log(`Bot #${this.id} picked up ${order.type} Order #${order.id}`)

    this.timer = setTimeout(() => {
      order.status = "COMPLETE"
      this.logger.log(`Bot #${this.id} completed Order #${order.id}`)
      this.order = null
      callback()
    }, 10000)
  }

  stop() {
    if (this.timer) clearTimeout(this.timer)
    this.order = null
    this.logger.log(`Bot #${this.id} stopped`)
  }
}

module.exports = Bot