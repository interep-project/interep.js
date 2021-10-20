import { InterRepBot } from "../src"

async function main() {
    const { TELEGRAM_BOT_TOKEN } = process.env

    const bot = new InterRepBot(TELEGRAM_BOT_TOKEN as string)

    console.info("\nInterRep bot started ✓\n")

    return bot.start()
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
