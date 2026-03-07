const Order = require("./order")

class OrderController {

  constructor(queue, botManager, logger) {
    this.queue = queue
    this.botManager = botManager
    this.logger = logger
    this.nextId = 1001
  }

  newNormalOrder() {

    const order = new Order(this.nextId++, "Normal")

    this.queue.add(order)

    this.logger.log(
      `Created Normal Order #${order.id} - Status: PENDING`
    )

    this.botManager.notifyBots()

  }

  newVipOrder() {

    const order = new Order(this.nextId++, "VIP")

    this.queue.add(order)

    this.logger.log(
      `Created VIP Order #${order.id} - Status: PENDING`
    )

    this.botManager.notifyBots()

  }

}

module.exports = OrderController