<p align="center">
    <h1 align="center">
        Interep db
    </h1>
    <p align="center">DB utility functions, schemas and models used by Interep.</p>
</p>

<p align="center">
    <a href="https://github.com/interep-project">
        <img src="https://img.shields.io/badge/project-Interep-blue.svg?style=flat-square">
    </a>
    <a href="https://github.com/interep-project/interep.js/blob/main/LICENSE">
        <img alt="Github license" src="https://img.shields.io/github/license/interep-project/interep.js.svg?style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/@interep/db">
        <img alt="NPM version" src="https://img.shields.io/npm/v/@interep/db?style=flat-square" />
    </a>
    <a href="https://npmjs.org/package/@interep/db">
        <img alt="Downloads" src="https://img.shields.io/npm/dm/@interep/db.svg?style=flat-square" />
    </a>
    <a href="https://bundlephobia.com/package/@interep/db">
        <img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/minzip/@interep/db" />
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

The `@interep/db` package is an internal package that contains utility functions, models and methods used in the system to interact with persistent data, and its purpose is to make Interep more database-agnostic. Interep currently uses MongoDB and Mongoose.

---

## 🛠 Install

### npm or yarn

Install the `@interep/db` package with npm:

```bash
npm i @interep/db --save
```

or yarn:

```bash
yarn add @interep/db
```

## 📜 Usage

\# **connect**(mongoUrl: _string_, errorListener?: (...args: _any[]_) => _void_): _Promise<boolean\>_

```typescript
import { connect } from "@interep/db"

const { MONGO_URL } = process.env

await connect(MONGO_URL)
// or await connect(MONGO_URL, (error) => console.error(error))
```

\# **disconnect**(): _Promise<boolean\>_

```typescript
import { disconnect } from "@interep/db"

await disconnect()
```

\# **clear**(): _Promise<boolean\>_

```typescript
import { clear } from "@interep/db"

await clear() // Delete all the db entries.
```

\# **drop**(): _Promise<boolean\>_

```typescript
import { drop } from "@interep/db"

await drop() // Drop the db.
```

\# **getState**(): _number_

```typescript
import { getState } from "@interep/db"

const state = getState()
/*
Connection ready state:

- 0 = disconnected
- 1 = connected
- 2 = connecting
- 3 = disconnecting
*/
```

You can find the model of each entity on `src/<entityName>/<EntityName.model.ts>`. Each model has predefined functions and some custom static functions defined on `src/<entityName>/<EntityName>.statics.ts`. The `@interep/db` package also exports types and models of each entity.
