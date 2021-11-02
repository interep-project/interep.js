<p align="center">
    <h1 align="center">
        InterRep db
    </h1>
    <p align="center">DB utility functions, schemas and models used by InterRep.</p>
</p>

<p align="center">
    <a href="https://github.com/InterRep">
        <img src="https://img.shields.io/badge/project-InterRep-blue.svg?style=flat-square">
    </a>
    <a href="https://github.com/interrep/interrep.js/blob/main/LICENSE">
        <img alt="Github license" src="https://img.shields.io/github/license/interrep/interrep.js.svg?style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/@interrep/db">
        <img alt="NPM version" src="https://img.shields.io/npm/v/@interrep/db?style=flat-square" />
    </a>
    <a href="https://npmjs.org/package/@interrep/db">
        <img alt="Downloads" src="https://img.shields.io/npm/dm/@interrep/db.svg?style=flat-square" />
    </a>
    <a href="https://bundlephobia.com/package/@interrep/db">
        <img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/minzip/@interrep/db" />
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

---

## 🛠 Install

### npm or yarn

Install the `@interrep/db` package with npm:

```bash
npm i @interrep/db --save
```

or yarn:

```bash
yarn add @interrep/db
```

## 📜 Usage

\# **connect**(mongoUrl: _string_, errorListener?: (...args: _any[]_) => _void_): _Promise<boolean\>_

```typescript
import { connect } from "@interrep/db"

const { MONGO_URL } = process.env

await connect(MONGO_URL)
// or await connect(MONGO_URL, (error) => console.error(error))
```

\# **disconnect**(): _Promise<boolean\>_

```typescript
import { disconnect } from "@interrep/db"

await disconnect()
```

\# **clear**(): _Promise<boolean\>_

```typescript
import { clear } from "@interrep/db"

await clear()
```

\# **drop**(): _Promise<boolean\>_

```typescript
import { drop } from "@interrep/db"

await drop()
```

\# **getState**(): _number_

```typescript
import { getState } from "@interrep/db"

const state = getState()
/*
Connection ready state:

- 0 = disconnected
- 1 = connected
- 2 = connecting
- 3 = disconnecting
*/
```

You can find the Mongoose model of each entity on `src/<entityName>/<EntityName.model.ts>`. Each model has predefined functions and some custom static functions defined on `src/<entityName>/<EntityName>.statics.ts`. The `@interrep/db` package also exports types and models of each entity.
