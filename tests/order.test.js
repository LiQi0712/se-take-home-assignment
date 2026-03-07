const Order = require('../src/models/order')

test('Order should initialize with PENDING status', () => {

  const order = new Order(1001, "VIP")

  expect(order.id).toBe(1001)
  expect(order.type).toBe("VIP")
  expect(order.status).toBe("PENDING")

})