// index.js
const Logger = require("./src/logger")
const OrderProcessor = require("./src/services/orderProcessor")
const Bot = require("./src/models/bot")
const Order = require("./src/models/order")

const logger = new Logger()
const processor = new OrderProcessor(logger)

// 创建 bots
const bot1 = new Bot(1, logger)
const bot2 = new Bot(2, logger)

processor.addBot(bot1)
processor.addBot(bot2)

// 创建订单
const order1 = new Order(1001, "Normal")
const order2 = new Order(1002, "VIP")
const order3 = new Order(1003, "Normal")
const order4 = new Order(1004, "VIP")

processor.addOrder(order1)
processor.addOrder(order2)
processor.addOrder(order3)
processor.addOrder(order4)

// 模拟 removeBot（延迟 12 秒，确保有订单处理中）
setTimeout(() => {
  processor.removeBot()  // 移除最后一个 bot
}, 12000)

// 打印最终状态
const checkInterval = setInterval(() => {
  const pendingOrders = processor.vip.length + processor.normal.length
  const busyBots = processor.bots.some(bot => bot.order !== null)

  if (pendingOrders === 0 && !busyBots) {
    logger.log("\nFinal Status:")
    logger.log(`Active Bots: ${processor.bots.length}`)
    logger.log(`Pending Orders: ${pendingOrders}`)
    clearInterval(checkInterval)
    process.exit(0)
  }
}, 1000)