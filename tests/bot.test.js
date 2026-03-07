const Bot = require('../src/models/bot')
const Order = require('../src/models/order')

jest.useFakeTimers() // 使用虚拟定时器加速测试

describe('Bot', () => {
  let logger

  beforeEach(() => {
    logger = { log: jest.fn() }
  })

  test('should process order and mark COMPLETE', () => {
    const bot = new Bot(1, logger)
    const order = new Order(1001, 'Normal')
    const callback = jest.fn()

    bot.process(order, callback)

    // advance timers
    jest.advanceTimersByTime(10000)

    expect(order.status).toBe('COMPLETE')
    expect(bot.order).toBeNull()
    expect(callback).toHaveBeenCalled()
  })

  test('stop should clear timer and reset order', () => {
    const bot = new Bot(1, logger)
    const order = new Order(1001, 'Normal')
    const callback = jest.fn()

    bot.process(order, callback)
    bot.stop()

    expect(bot.order).toBeNull()
  })
})