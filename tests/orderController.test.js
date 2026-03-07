const OrderQueue = require("../src/orderQueue")
const BotManager = require("../src/botManager")
const Logger = require("../src/logger")
const OrderController = require("../src/orderController")
const fs = require("fs")
const path = require("path")

describe("OrderController", () => {

  const logFile = path.join(__dirname, "../scripts/result.txt")

  beforeEach(() => {
    if (fs.existsSync(logFile)) fs.unlinkSync(logFile)
  })

  test("newNormalOrder creates order and logs", () => {
    const queue = new OrderQueue()
    const logger = new Logger()
    const botManager = new BotManager(queue, logger)
    const controller = new OrderController(queue, botManager, logger)

    controller.newNormalOrder()

    const content = fs.readFileSync(logFile, "utf-8")
    expect(content).toMatch(/Created Normal Order #1001/)
  })

})