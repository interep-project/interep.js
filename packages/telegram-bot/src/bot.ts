import { connect } from "@interrep/db"
import { Bot, PollingOptions } from "grammy"
import join from "./commands/join"
import leave from "./commands/leave"
import showHelpMessage from "./commands/showHelpMessage"
import showStartMessage from "./commands/showStartMessage"

export default class InterRepBot extends Bot {
    readonly mongodbUrl: string
    readonly appURL: string

    constructor(token: string, mongodbUrl: string, appURL: string) {
        super(token)

        this.mongodbUrl = mongodbUrl
        this.appURL = appURL

        this.api.setMyCommands([
            { command: "help", description: "show the help message" },
            { command: "join", description: "send you a magic link to join a group" }
            // { command: "leave", description: "send you a magic link to leave a group" }
        ])

        this.command("help", (ctx) => showHelpMessage(this, ctx.chat, ctx.from))
        this.command("start", (ctx) => showStartMessage(this, ctx.chat, ctx.match, ctx.from))
        this.command("join", async (ctx) => join(this, ctx.chat, ctx.msg, ctx.from))
        this.command("leave", async (ctx) => leave(this, ctx.chat, ctx.msg, ctx.from))
    }

    async start(options?: PollingOptions): Promise<void> {
        await connect(this.mongodbUrl)
        await super.start(options)
    }
}
