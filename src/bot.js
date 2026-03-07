class Bot {

  constructor(id, queue, logger) {
    this.id = id
    this.queue = queue
    this.logger = logger
    this.order = null
    this.timer = null
  }

  start() {
    this.process()
  }

  process() {

    if (!this.queue.hasOrder()) {
      this.logger.log(`Bot #${this.id} is now IDLE - No pending orders`)
      return
    }

    const order = this.queue.next()

    if (!order) return

    this.order = order
    order.status = "PROCESSING"

    this.logger.log(
      `Bot #${this.id} picked up ${order.type} Order #${order.id} - Status: PROCESSING`
    )

    this.timer = setTimeout(() => {

      order.status = "COMPLETE"

      this.logger.log(
        `Bot #${this.id} completed ${order.type} Order #${order.id} - Status: COMPLETE (Processing time: 10s)`
      )

      this.order = null

      this.process()

    }, 10000)

  }

  stop() {

    if (this.timer) {
      clearTimeout(this.timer)
    }

    if (this.order) {

      this.logger.log(
        `Bot #${this.id} stopped while processing Order #${this.order.id}`
      )

      this.queue.returnOrder(this.order)

    } else {

      this.logger.log(`Bot #${this.id} destroyed while IDLE`)

    }

  }

}

module.exports = Bot