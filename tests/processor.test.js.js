const OrderProcessor = require('../src/services/orderProcessor')
const Order = require('../src/models/order')

const logger = { log: jest.fn() }

test('VIP order should be processed first', () => {

  const processor = new OrderProcessor(logger)

  const order1 = new Order(1001, "Normal")
  const order2 = new Order(1002, "VIP")

  processor.addOrder(order1)
  processor.addOrder(order2)

  const next = processor.nextOrder()

  expect(next.type).toBe("VIP")

})