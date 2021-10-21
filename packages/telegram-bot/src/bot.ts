import { Bot, InlineKeyboard } from "grammy"

export default class InterRepBot extends Bot {
    constructor(token: string) {
        super(token)

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
                await ctx.reply("Great, you can receive the magic links here now 🎉")
            }
        })

        this.command("join", async (ctx) => {
            const user = ctx.from
            const { chat } = ctx

            if (chat.type === "private") {
                await ctx.reply(
                    "You cannot use this command in private chat. Please run the /help command to see how the bot works!"
                )
            }

            if (chat.type !== "private" && user) {
                await this.api
                    .sendMessage(
                        user.id,
                        `Here's the magic link: https://kovan.interrep.link/telegram/${user.id}/${chat.id} 😉`
                    )
                    .catch(async (error) => {
                        if (error?.error_code === 403) {
                            const inlineKeyboard = new InlineKeyboard().url(
                                "@InterRepBot",
                                "https://telegram.me/InterRepBot?start=connect"
                            )

                            await ctx.reply(
                                "Click below and start the bot in a private chat to receive InterRep magic links!",
                                {
                                    reply_to_message_id: ctx.msg.message_id,
                                    reply_markup: inlineKeyboard
                                }
                            )
                        }

                        console.error(error)
                    })
            }
        })
    }
}
