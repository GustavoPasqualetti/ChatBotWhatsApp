import { VenomBot } from './venom.js'
import { stages, getStage } from './stages.js'

const main = async () => {
  try {
    const venombot = await VenomBot.getInstance().init({
      session: 'Complete Energy Vision',
      headless: false,
      useChrome: true,
    })

    venombot.onMessage(async (message) => {
      if (message.isGroupMsg) return

      const currentStage = getStage({ from: message.from })

      await stages[currentStage].stage.exec({
        from: message.from,
        message: message.body,
      })
    })
  } catch (error) {
    console.error(error)
  }
}

main()
