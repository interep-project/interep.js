import { InterepBot } from "../src"

async function main() {
    const { TELEGRAM_BOT_TOKEN, MONGO_URL, APP_URL } = process.env

    const bot = new InterepBot(TELEGRAM_BOT_TOKEN as string, MONGO_URL as string, APP_URL as string)

    return bot.start()
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
