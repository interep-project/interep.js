import { InlineKeyboard } from "grammy"
import { Chat, Message, User } from "grammy/out/platform.node"
import InterRepBot from "../bot"
import TelegramUser from "../model/TelegramUser.model"
import sha256 from "../sha256"

export default async function join(bot: InterRepBot, chat: Chat, msg: Message, user?: User) {
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

            if (telegramUser && telegramUser.joined) {
                await bot.api.sendMessage(user.id, `You already joined the ${chat.title} Semaphore group!`)
                return
            }

            if (!telegramUser) {
                await TelegramUser.create({
                    hashId,
                    joined: false
                })
            }

            await bot.api.sendMessage(
                user.id,
                `Here's the magic link: ${bot.appURL}/telegram/join/${user.id}/${chat.id} 😉`
            )
        } catch (error: any) {
            if (error?.error_code === 403) {
                const inlineKeyboard = new InlineKeyboard().url(
                    "@InterRepBot",
                    "https://telegram.me/InterRepBot?start=connect"
                )

                await bot.api.sendMessage(
                    chat.id,
                    "Click below, start the bot in a private chat and run /join again to receive InterRep magic links!",
                    {
                        reply_to_message_id: msg.message_id,
                        reply_markup: inlineKeyboard
                    }
                )
            } else {
                console.error(error)
            }
        }
    }
}
