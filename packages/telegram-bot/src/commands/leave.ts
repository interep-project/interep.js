import { TelegramUser } from "@interep/db"
import { Bot } from "grammy"
import { Chat, Message, User } from "grammy/out/platform.node"
import getTelegramGroups from "../getTelegramGroups"
import sha256 from "../sha256"
import TelegramGroup from "../telegramGroup"
import showConnectButton from "./showConnectButton"

/* istanbul ignore next */
export default async function leave(bot: Bot, appURL: string, chat: Chat, msg: Message, user?: User) {
    if (chat.type === "private") {
        bot.api.sendMessage(
            chat.id,
            "You cannot use this command in a private chat. Please run the /help command to see how the bot works!"
        )
    }

    if (chat.type !== "private" && user) {
        try {
            const groupId = chat.id.toString()

            if (!getTelegramGroups().includes(groupId as TelegramGroup)) {
                await bot.api.sendMessage(
                    user.id,
                    `Sorry, this group is not supported, please contact the InterRep team!`
                )
                return
            }

            const hashId = sha256(user.id.toString() + chat.id.toString())
            const telegramUser = await TelegramUser.findByHashId(hashId)

            if (!telegramUser || !telegramUser.hasJoined) {
                await bot.api.sendMessage(user.id, `You are not part of the '${chat.title}' Semaphore group!`)
                return
            }

            await bot.api.sendMessage(
                user.id,
                `Here's the magic link to leave the '${chat.title}' group: ${appURL}/groups/telegram/${user.id}/${chat.id} 😉`
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
