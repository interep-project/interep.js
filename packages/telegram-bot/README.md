<p align="center">
    <h1 align="center">
        Interep Telegram bot
    </h1>
    <p align="center">Interep Telegram bot to allow users to join Semaphore Telegram groups.</p>
</p>

<p align="center">
    <a href="https://github.com/interep">
        <img src="https://img.shields.io/badge/project-Interep-blue.svg?style=flat-square">
    </a>
    <a href="https://github.com/interep/interep.js/blob/main/LICENSE">
        <img alt="Github license" src="https://img.shields.io/github/license/interep/interep.js.svg?style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/@interep/telegram-bot">
        <img alt="NPM version" src="https://img.shields.io/npm/v/@interep/telegram-bot?style=flat-square" />
    </a>
    <a href="https://npmjs.org/package/@interep/telegram-bot">
        <img alt="Downloads" src="https://img.shields.io/npm/dm/@interep/telegram-bot.svg?style=flat-square" />
    </a>
    <a href="https://bundlephobia.com/package/@interep/telegram-bot">
        <img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/minzip/@interep/telegram-bot" />
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
        <a href="https://docs.interep.link/contributing">
            👥 Contributing
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://docs.interep.link/code-of-conduct">
            🤝 Code of conduct
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://t.me/interrep">
            🗣️ Chat &amp; Support
        </a>
    </h4>
</div>

The Interep bot allows Telegram users to join corresponding Semaphore groups on Interep. If a user is for example a member of the Telegram group 'Hello world', the bot will send a magic link in their private chat that will allow them to join the Semaphore Telegram group 'Hello world' on our web application with Metamask.

When the bot sends the magic link (consisting of the user and group ids) it also saves a sha256 hash of the user and group ids with a flag to ensure that the magic link is correct in the application. The application will then be able to check whether the user redirected by the magic link is actually a user who has requested to join the group. The hash ensures that Interep does not save any ids.

---

## 🛠 Install

### npm or yarn

Install the `@interep/telegram-bot` package with npm:

```bash
npm i @interep/telegram-bot --save
```

or yarn:

```bash
yarn add @interep/telegram-bot
```

## 📜 Usage

### Start an interep bot

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

\# **new interepBot**(token: _string_, mongodbUrl: _string_, appURL: _string_): _interepBot_

```typescript
import { interepBot } from "@interep/telegram-bot"

const { TELEGRAM_BOT_TOKEN, MONGO_URL, APP_URL } = process.env
const bot = new interepBot(TELEGRAM_BOT_TOKEN, MONGO_URL, APP_URL)

await bot.start()
```
