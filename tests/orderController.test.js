const OrderController = require('../src/controllers/orderController')

test('createNormal should add normal order', () => {

  let addedOrder = null

  const processor = {
    addOrder(order) {
      addedOrder = order
    }
  }

  const controller = new OrderController(processor)

  controller.createNormal()

  expect(addedOrder.type).toBe("Normal")

})