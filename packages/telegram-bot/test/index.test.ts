import dotenv from "dotenv"
import { InterRepBot } from "../src"

dotenv.config({ path: "./packages/telegram-bot/.env" })

describe("InterRep Telegram bot", () => {
    const { TELEGRAM_BOT_TOKEN } = process.env

    describe("...", () => {
        it("Should return an api object", async () => {
            const bot = new InterRepBot(TELEGRAM_BOT_TOKEN as string)

            expect(bot.token).toEqual(TELEGRAM_BOT_TOKEN)
        })
    })
})
