import { connect } from "@interep/db"
import { Bot, PollingOptions } from "grammy"
import join from "./commands/join"
import leave from "./commands/leave"
import showHelpMessage from "./commands/showHelpMessage"
import showStartMessage from "./commands/showStartMessage"

/* istanbul ignore next */
export default class InterepBot {
    readonly mongodbUrl: string
    readonly appURL: string

    private bot: Bot

    constructor(token: string, mongodbUrl: string, appURL: string) {
        this.bot = new Bot(token)

        this.mongodbUrl = mongodbUrl
        this.appURL = appURL

        this.bot.api.setMyCommands([
            { command: "help", description: "show the help message" },
            { command: "join", description: "send you a magic link to join a group" },
            { command: "leave", description: "send you a magic link to leave a group" }
        ])

        this.bot.command("help", (ctx) => showHelpMessage(this.bot, ctx.chat, ctx.from))
        this.bot.command("start", (ctx) => showStartMessage(this.bot, ctx.chat, ctx.match, ctx.from))
        this.bot.command("join", async (ctx) => join(this.bot, this.appURL, ctx.chat, ctx.msg, ctx.from))
        this.bot.command("leave", async (ctx) => leave(this.bot, this.appURL, ctx.chat, ctx.msg, ctx.from))
    }

    async start(options?: PollingOptions): Promise<void> {
        await connect(this.mongodbUrl)
        await this.bot.start(options)
    }
}
