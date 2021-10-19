<p align="center">
    <h1 align="center">
        Semaphore Ethereum identities
    </h1>
    <p align="center">A simple JS library to create Semaphore identity commitments by deriving it from a signed message.</p>
</p>

<p align="center">
    <a href="https://github.com/InterRep">
        <img src="https://img.shields.io/badge/project-InterRep-blue.svg?style=flat-square">
    </a>
    <a href="https://github.com/interrep/interrep.js/blob/main/LICENSE">
        <img alt="Github license" src="https://img.shields.io/github/license/interrep/interrep.js.svg?style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/@interrep/semethid">
        <img alt="NPM version" src="https://img.shields.io/npm/v/@interrep/semethid?style=flat-square" />
    </a>
    <a href="https://npmjs.org/package/@interrep/semethid">
        <img alt="Downloads" src="https://img.shields.io/npm/dm/@interrep/semethid.svg?style=flat-square" />
    </a>
    <a href="https://bundlephobia.com/package/@interrep/semethid">
        <img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/minzip/@interrep/semethid" />
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
        <a href="https://js.interrep.link/semethid">
            🕹 Demo
        </a>
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

Install the `@interrep/semithid` package with npm:

```bash
npm i @interrep/semethid --save
```

or yarn:

```bash
yarn add @interrep/semethid
```

## 📜 Usage

\# **semethid**(sign: _(message: string) => Promise\<string\>_, web2Provider: _string_, nonce?: _number_): _Identity_

```typescript
import semethid from "@interrep/semethid"
import detectEthereumProvider from "@metamask/detect-provider"
import { ethers } from "ethers"

const ethereumProvider = (await detectEthereumProvider()) as any
const provider = new ethers.providers.Web3Provider(ethereumProvider)
const signer = provider.getSigner()

const identityCommitment = await semethid((message) => signer.signMessage(message), "twitter")
```
