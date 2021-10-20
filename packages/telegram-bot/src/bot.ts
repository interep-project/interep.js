import { Bot, InlineKeyboard } from "grammy"

export default class InterRepBot extends Bot {
    constructor(token: string) {
        super(token)

        this.api.setMyCommands([
            { command: "join", description: "Send you a magic link to join InterRep groups." },
            { command: "help", description: "Show the help message." }
        ])

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

                            await ctx.reply("Click below and start the bot chat to receive InterRep magic links!", {
                                reply_to_message_id: ctx.msg.message_id,
                                reply_markup: inlineKeyboard
                            })
                        }

                        console.error(error)
                    })
            }
        })

        this.command("help", async (ctx) => {
            await ctx.reply("Help message")
        })
    }
}
