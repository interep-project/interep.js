import { Bot } from "grammy"
import { Chat, User } from "grammy/out/platform.node"

export default async function sendHelpMessage(bot: Bot, chat: Chat, user?: User): Promise<void> {
    let subject: string
    let action: string

    if (chat.type === "private") {
        subject = (user as User).first_name
        action =
            "Add me to a supported group here on Telegram so I can send a magic link to anyone who wants to join the corresponding Semaphore group\\. You can see our supported groups [here](https://docs.interrep.link/technical-overview/groups/telegram)\\."
    } else {
        subject = "everyone"
        action = `Run /join so I can redirect you to our application where you will able to join the \`${chat.title}\` Semaphore group\\. If you want to leave a group run /leave\\.`
    }

    await bot.api.sendMessage(
        chat.id,
        `Hi \`${subject}\` 👋 If you want a system that allows you to access services or functions without revealing your identity, you are in the right place\\. InterRep provides special groups which [Semaphore](https://semaphore.appliedzkp.org/) then uses to create completely anonymous proofs of membership\\.\n\n${action}\n\nIf you want to know more about InterRep, visit our [documentation website](https://docs.interrep.link) and our [Github repositories](https://github.com/interrep)\\.`,
        {
            parse_mode: "MarkdownV2",
            disable_web_page_preview: true
        }
    )
}
