const Logger = require("./src/logger")
const OrderProcessor = require("./src/services/orderProcessor")
const OrderController = require("./src/controllers/orderController")
const BotController = require("./src/controllers/botController")

const logger = new Logger()

const processor = new OrderProcessor(logger)

const orderController = new OrderController(processor)
const botController = new BotController(processor, logger)

logger.log("System initialized with 0 bots")

orderController.createNormal()

setTimeout(() => {
  orderController.createVIP()
}, 1000)

setTimeout(() => {
  orderController.createNormal()
}, 2000)

setTimeout(() => {
  botController.addBot()
}, 3000)

setTimeout(() => {
  botController.addBot()
}, 4000)

setTimeout(() => {
  orderController.createVIP()
}, 15000)

setTimeout(() => {
  botController.removeBot()
}, 25000)

setTimeout(() => {

  logger.log("")
  logger.log("Final Status:")
  logger.log(`Active Bots: ${processor.bots.length}`)
  logger.log(`Pending Orders: ${processor.vip.length + processor.normal.length}`)

  process.exit(0)

}, 26000)