const OrderQueue = require("./src/orderQueue")
const Logger = require("./src/logger")
const BotManager = require("./src/botManager")
const OrderController = require("./src/orderController")

const logger = new Logger()
const queue = new OrderQueue()
const botManager = new BotManager(queue, logger)
const controller = new OrderController(queue, botManager, logger)

logger.log("System initialized with 0 bots")

controller.newNormalOrder()

setTimeout(() => {
  controller.newVipOrder()
}, 1000)

setTimeout(() => {
  controller.newNormalOrder()
}, 2000)

setTimeout(() => {
  botManager.addBot()
}, 3000)

setTimeout(() => {
  botManager.addBot()
}, 4000)

setTimeout(() => {
  controller.newVipOrder()
}, 15000)

setTimeout(() => {
  botManager.removeBot()
}, 25000)

setTimeout(() => {

  logger.log("")
  logger.log("Final Status:")
  logger.log(`- Active Bots: ${botManager.activeBots()}`)
  logger.log(`- Pending Orders: ${queue.pendingCount()}`)

  process.exit(0)
  
}, 26000)