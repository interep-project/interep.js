<p align="center">
    <h1 align="center">
        InterRep API
    </h1>
    <p align="center">A JS library to wrap the InterRep REST APIs.</p>
</p>

<p align="center">
    <a href="https://github.com/InterRep">
        <img src="https://img.shields.io/badge/project-InterRep-blue.svg?style=flat-square">
    </a>
    <a href="https://github.com/interrep/interrep.js/blob/main/LICENSE">
        <img alt="Github license" src="https://img.shields.io/github/license/interrep/interrep.js.svg?style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/@interrep/api">
        <img alt="NPM version" src="https://img.shields.io/npm/v/@interrep/api?style=flat-square" />
    </a>
    <a href="https://npmjs.org/package/@interrep/api">
        <img alt="Downloads" src="https://img.shields.io/npm/dm/@interrep/api.svg?style=flat-square" />
    </a>
    <a href="https://bundlephobia.com/package/@interrep/api">
        <img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/minzip/@interrep/api" />
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
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
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

Install the `@interrep/api` package with npm:

```bash
npm i @interrep/api --save
```

or yarn:

```bash
yarn add @interrep/api
```

### CDN

You can also load it using a `script` tag using [unpkg](https://unpkg.com/):

```html
<script src="https://unpkg.com/@interrep/api/"></script>
```

or [JSDelivr](https://www.jsdelivr.com/):

```html
<script src="https://cdn.jsdelivr.net/npm/@interrep/api/"></script>
```

## 📜 Usage

\# **new API**(environment: _Environment_): _API_

```typescript
import { API } from "@interrep/api"

const api = new API()

console.log(api.url) // "https://kovan.interrep.link/api"
```

\# **api.getGroups**(): _any[]_

\# **api.providers**(): _string[]_

\# **api.checkIdentityCommitments**(parameters: _CheckIdentityCommitmentRequest_): _string[]_

\# **api.addIdentityCommitments**(parameters: _AddIdentityCommitmentRequest_): _string[]_

\# **api.getMerkleTreePath**(parameters: _GetMerkleTreePathRequest_): _string[]_
