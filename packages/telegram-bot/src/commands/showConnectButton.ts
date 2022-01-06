import { Bot, InlineKeyboard } from "grammy"
import { Chat, Message } from "grammy/out/platform.node"

export default async function showConnectButton(bot: Bot, chat: Chat, msg: Message, command: string) {
    const inlineKeyboard = new InlineKeyboard().url(
        "Connect",
        `https://telegram.me/${bot.botInfo.username}?start=connect`
    )

    await bot.api.sendMessage(
        chat.id,
        `Click below, start the bot in a private chat and run /${command} again to receive InterRep magic links!`,
        {
            reply_to_message_id: msg.message_id,
            reply_markup: inlineKeyboard
        }
    )
}
