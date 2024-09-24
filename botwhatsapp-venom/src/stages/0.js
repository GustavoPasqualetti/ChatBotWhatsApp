import { storage } from '../storage.js'
import { VenomBot } from '../venom.js'
import { STAGES } from './index.js'

export const initialStage = {
  async exec({ from }) {
    storage[from].stage = STAGES.MENU

    const venombot = await VenomBot.getInstance()

    const message = `
    👋 Olá, como vai?
      Eu sou ChatBot, o assistente virtual da ${venombot.getSessionName}.
      *Como posso te ajudar?* 🙋‍♂️
      -----------------------------------
      1️⃣ - RELATAR PROBLEMA DE ENERGIA
      0️⃣ - CANCELAR
    `
    await venombot.sendText({ to: from, message })
  },
}
