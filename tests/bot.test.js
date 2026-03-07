const Bot = require('../src/models/bot')
const Order = require('../src/models/order')

jest.useFakeTimers()

const logger = {
  log: jest.fn()
}

test('Bot should process order', () => {

  const bot = new Bot(1, logger)
  const order = new Order(1001, "Normal")

  const callback = jest.fn()

  bot.process(order, callback)

  jest.runAllTimers()

  expect(order.status).toBe("COMPLETE")
  expect(bot.order).toBe(null)
  expect(callback).toHaveBeenCalled()

})