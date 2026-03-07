const BotController = require('../src/controllers/botController')

test('addBot should add a bot', () => {

  let addedBot = null

  const processor = {
    addBot(bot) {
      addedBot = bot
    }
  }

  const logger = { log: jest.fn() }

  const controller = new BotController(processor, logger)

  controller.addBot()

  expect(addedBot.id).toBe(1)

})