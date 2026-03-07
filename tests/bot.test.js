const Bot = require("../src/bot")
const OrderQueue = require("../src/orderQueue")
const Logger = require("../src/logger")
const fs = require("fs")
const path = require("path")

jest.setTimeout(20000) // 全局 20 秒

describe("Bot", () => {

  const logFile = path.join(__dirname, "../scripts/result.txt")

  beforeEach(() => {
    if (fs.existsSync(logFile)) fs.unlinkSync(logFile)
  })

  test("Bot processes order", (done) => {
    const queue = new OrderQueue()
    const logger = new Logger()
    const bot = new Bot(1, queue, logger)

    queue.add({ id: 1001, type: "Normal", status: "PENDING" })

    bot.process()

    setTimeout(() => {
      const content = fs.readFileSync(logFile, "utf-8")
      expect(content).toMatch(/completed Normal Order #1001/)

      bot.stop() // 停掉定时器
      done()
    }, 11000)
  })

})