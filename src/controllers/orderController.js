const Order = require("../models/order")

class OrderController {

  constructor(processor) {
    this.processor = processor
    this.nextId = 1001
  }

  createNormal() {

    const order = new Order(this.nextId++, "Normal")

    this.processor.addOrder(order)

  }

  createVIP() {

    const order = new Order(this.nextId++, "VIP")

    this.processor.addOrder(order)

  }

}

module.exports = OrderController