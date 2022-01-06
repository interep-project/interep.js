import { Bot } from "grammy"
import { Chat, User } from "grammy/out/platform.node"
import showHelpMessage from "./showHelpMessage"

export default async function sendStartMessage(bot: Bot, chat: Chat, payload: string, user?: User) {
    if (chat.type === "private") {
        if (payload === "connect") {
            bot.api.sendMessage(
                chat.id,
                "Great, you can receive the magic links here now 🎉\n\nRun /join when you are in a group!"
            )
        } else {
            showHelpMessage(bot, chat, user)
        }
    }
}
