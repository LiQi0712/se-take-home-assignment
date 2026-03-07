class OrderQueue {

  constructor() {
    this.vip = []
    this.normal = []
  }

  add(order) {
    if (order.type === "VIP") {
      this.vip.push(order)
    } else {
      this.normal.push(order)
    }
  }

  next() {
    if (this.vip.length > 0) {
      return this.vip.shift()
    }

    if (this.normal.length > 0) {
      return this.normal.shift()
    }

    return null
  }

  hasOrder() {
    return this.vip.length > 0 || this.normal.length > 0
  }

  returnOrder(order) {
    order.status = "PENDING"

    if (order.type === "VIP") {
      this.vip.unshift(order)
    } else {
      this.normal.unshift(order)
    }
  }

  pendingCount() {
    return this.vip.length + this.normal.length
  }

}

module.exports = OrderQueue