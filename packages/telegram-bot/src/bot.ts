import { Bot, InlineKeyboard, PollingOptions } from "grammy"
import connectDB from "./connectDB"
import TelegramUser from "./model/TelegramUser.model"
import sha256 from "./sha256"

export default class InterRepBot extends Bot {
    readonly mongodbUrl: string

    constructor(token: string, mongodbUrl: string, appURL: string) {
        super(token)

        this.mongodbUrl = mongodbUrl

        this.api.setMyCommands([
            { command: "help", description: "show the help message" },
            { command: "join", description: "send you a magic link" }
        ])

        this.command("help", async (ctx) => {
            const { chat } = ctx

            let subject
            let action

            if (chat.type === "private") {
                subject = ctx.from ? `@${ctx.from.username}` : ""
                action =
                    "Add me to a group here on Telegram so I can send a magic link to anyone who wants to join the corresponding Semaphore group\\. "
            } else {
                subject = "everyone"
                action = `Run /join so I can redirect you to our application where you will able to join the *${chat.title}* Semaphore group\\. `
            }

            await this.api.sendMessage(
                ctx.chat.id,
                `Hi ${subject} 👋 If you want a system that allows you to access services or functions without revealing your identity, you are in the right place\\. InterRep provides special groups which [Semaphore](https://semaphore.appliedzkp.org/) then uses to create completely anonymous proofs of membership\\.\n\n ${action}\n\n If you want to know more about InterRep, visit our [documentation website](https://docs.interrep.link) and our [Github repositories](https://github.com/interrep)\\.`,
                {
                    parse_mode: "MarkdownV2",
                    disable_web_page_preview: true
                }
            )
        })

        this.command("start", async (ctx) => {
            const { chat, match } = ctx

            if (chat.type === "private" && match === "connect") {
                await ctx.reply(
                    "Great, you can receive the magic links here now 🎉\n\nRun /join when you are in a group!"
                )
            }
        })

        this.command("join", async (ctx) => {
            const user = ctx.from
            const { chat } = ctx

            if (chat.type === "private") {
                await ctx.reply(
                    "You cannot use this command in a private chat. Please run the /help command to see how the bot works!"
                )
            }

            if (chat.type !== "private" && user) {
                try {
                    const hashId = sha256(user.id.toString() + chat.id.toString())
                    const telegramUser = await TelegramUser.findByHashId(hashId)

                    if (telegramUser && telegramUser.joined) {
                        await this.api.sendMessage(user.id, `You already joined the ${chat.title} Semaphore group!`)
                        return
                    }

                    if (!telegramUser) {
                        await TelegramUser.create({
                            hashId,
                            joined: false
                        })
                    }

                    await this.api.sendMessage(
                        user.id,
                        `Here's the magic link: ${appURL}/telegram/join/${user.id}/${chat.id} 😉`
                    )
                } catch (error: any) {
                    if (error?.error_code === 403) {
                        const inlineKeyboard = new InlineKeyboard().url(
                            "@InterRepBot",
                            "https://telegram.me/InterRepBot?start=connect"
                        )

                        await ctx.reply(
                            "Click below, start the bot in a private chat and run /join again to receive InterRep magic links!",
                            {
                                reply_to_message_id: ctx.msg.message_id,
                                reply_markup: inlineKeyboard
                            }
                        )
                    } else {
                        console.error(error)
                    }
                }
            }
        })
    }

    async start(options?: PollingOptions): Promise<void> {
        await connectDB(this.mongodbUrl)
        await super.start(options)
    }
}
