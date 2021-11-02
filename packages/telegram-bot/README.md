<p align="center">
    <h1 align="center">
        InterRep Telegram bot
    </h1>
    <p align="center">InterRep Telegram bot to allow users to join Semaphore Telegram groups.</p>
</p>

<p align="center">
    <a href="https://github.com/InterRep">
        <img src="https://img.shields.io/badge/project-InterRep-blue.svg?style=flat-square">
    </a>
    <a href="https://github.com/interrep/interrep.js/blob/main/LICENSE">
        <img alt="Github license" src="https://img.shields.io/github/license/interrep/interrep.js.svg?style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/@interrep/telegram-bot">
        <img alt="NPM version" src="https://img.shields.io/npm/v/@interrep/telegram-bot?style=flat-square" />
    </a>
    <a href="https://npmjs.org/package/@interrep/telegram-bot">
        <img alt="Downloads" src="https://img.shields.io/npm/dm/@interrep/telegram-bot.svg?style=flat-square" />
    </a>
    <a href="https://bundlephobia.com/package/@interrep/telegram-bot">
        <img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/minzip/@interrep/telegram-bot" />
    </a>
    <a href="https://eslint.org/">
        <img alt="Linter eslint" src="https://img.shields.io/badge/linter-eslint-8080f2?style=flat-square&logo=eslint" />
    </a>
    <a href="https://prettier.io/">
        <img alt="Code style prettier" src="https://img.shields.io/badge/code%20style-prettier-f8bc45?style=flat-square&logo=prettier" />
    </a>
</p>

<div align="center">
    <h4>
        <a href="https://docs.interrep.link/contributing">
            👥 Contributing
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://docs.interrep.link/code-of-conduct">
            🤝 Code of conduct
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://t.me/interrep">
            🗣️ Chat &amp; Support
        </a>
    </h4>
</div>

The InterRep bot allows Telegram users to join corresponding Semaphore groups on InterRep. If a user is for example a member of the Telegram group 'Hello world', the bot will send a magic link in their private chat that will allow them to join the Semaphore Telegram group 'Hello world' on our web application with Metamask.

When the bot sends the magic link (consisting of the user and group ids) it also saves a hash of the user and group ids with a flag to ensure that the magic link is correct in the application. The application will then be able to check whether the user redirected by the magic link is actually a user who has requested to join the group. The hash ensures that InterRep does not save any ids.

---

## 🛠 Install

### npm or yarn

Install the `@interrep/telegram-bot` package with npm:

```bash
npm i @interrep/telegram-bot --save
```

or yarn:

```bash
yarn add @interrep/telegram-bot
```

## 📜 Usage

### Start an InterRep bot

Before starting the bot you must configure the environment variables. Copy the `.env.example` file and rename it as `.env`:

```bash
cp .env.example .env
```

You can create a Telegram bot and obtain a token with [@BotFather](https://telegram.me/@BotFather).

Once the environment variables have been set, start the bot with the npm `start` script:

```bash
yarn start
```

### API

\# **new InterRepBot**(token: _string_, mongodbUrl: _string_, appURL: _string_): _InterRepBot_

```typescript
import { InterRepBot } from "@interrep/telegram-bot"

const { TELEGRAM_BOT_TOKEN, MONGO_URL, APP_URL } = process.env
const bot = new InterRepBot(TELEGRAM_BOT_TOKEN, MONGO_URL, APP_URL)

await bot.start()
```

\# **sha256**(message: _string_): _string_

```typescript
import { sha256 } from "@interrep/telegram-bot"
import { TelegramUser } from "@interrep/db"

const hashId = sha256("user id + group id")
const telegramUser = TelegramUser.findByHashId(hashId)
```
