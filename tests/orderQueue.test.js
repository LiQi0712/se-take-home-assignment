const OrderQueue = require("../src/orderQueue")
const Order = require("../src/order")

describe("OrderQueue", () => {

  test("should add and retrieve VIP order first", () => {
    const queue = new OrderQueue()
    const normal = new Order(1, "Normal")
    const vip = new Order(2, "VIP")

    queue.add(normal)
    queue.add(vip)

    expect(queue.next()).toBe(vip)
    expect(queue.next()).toBe(normal)
  })

  test("should return order to queue", () => {
    const queue = new OrderQueue()
    const order = new Order(1, "Normal")
    queue.add(order)

    const o = queue.next()
    queue.returnOrder(o)

    expect(queue.hasOrder()).toBe(true)
    expect(queue.next()).toBe(order)
  })

})