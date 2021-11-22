import { TelegramUser } from "@interrep/db"
import { Chat, Message, User } from "grammy/out/platform.node"
import InterRepBot from "../bot"
import sha256 from "../sha256"
import showConnectButton from "./showConnectButton"

export default async function leave(bot: InterRepBot, chat: Chat, msg: Message, user?: User) {
    if (chat.type === "private") {
        bot.api.sendMessage(
            chat.id,
            "You cannot use this command in a private chat. Please run the /help command to see how the bot works!"
        )
    }

    if (chat.type !== "private" && user) {
        try {
            const hashId = sha256(user.id.toString() + chat.id.toString())
            const telegramUser = await TelegramUser.findByHashId(hashId)

            if (!telegramUser || !telegramUser.joined) {
                await bot.api.sendMessage(user.id, `You are not part of the '${chat.title}' Semaphore group!`)
                return
            }

            await bot.api.sendMessage(
                user.id,
                `Here's the magic link to leave the '${chat.title}' group: ${bot.appURL}/groups/telegram/leave/${user.id}/${chat.id} 😉`
            )
        } catch (error: any) {
            if (error?.error_code === 403) {
                await showConnectButton(bot, chat, msg, "leave")
            } else {
                console.error(error)
            }
        }
    }
}
