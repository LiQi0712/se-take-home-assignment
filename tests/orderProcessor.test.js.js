const OrderProcessor = require('../src/services/orderProcessor')
const Bot = require('../src/models/bot')
const Order = require('../src/models/order')

jest.useFakeTimers()

describe('OrderProcessor', () => {
  let logger, processor

  beforeEach(() => {
    logger = { log: jest.fn() }
    processor = new OrderProcessor(logger)
  })

  test('should dispatch VIP orders first', () => {
    const bot = new Bot(1, logger)
    processor.addBot(bot)

    const normalOrder = new Order(1001, 'Normal')
    const vipOrder = new Order(1002, 'VIP')

    processor.addOrder(normalOrder)
    processor.addOrder(vipOrder)

    // 触发 dispatch
    jest.advanceTimersByTime(10000)

    expect(normalOrder.status).toBe('PENDING') // 还没被bot处理
    expect(vipOrder.status).toBe('COMPLETE')   // VIP先被处理
  })

  test('removing bot returns unfinished order to queue', () => {
    const bot1 = new Bot(1, logger)
    const bot2 = new Bot(2, logger)

    processor.addBot(bot1)
    processor.addBot(bot2)

    const order1 = new Order(1001, 'Normal')
    const order2 = new Order(1002, 'VIP')

    processor.addOrder(order1)
    processor.addOrder(order2)

    // bot1 和 bot2 都在处理
    processor.removeBot() // 移除最后一个 bot

    // 订单应该回队列
    expect(processor.vip.length + processor.normal.length).toBeGreaterThan(0)
  })
})