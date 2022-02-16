<p align="center">
    <h1 align="center">
        Interep identities
    </h1>
    <p align="center">A simple JS function to create Interep identities.</p>
</p>

<p align="center">
    <a href="https://github.com/interep">
        <img src="https://img.shields.io/badge/project-Interep-blue.svg?style=flat-square">
    </a>
    <a href="https://github.com/interep/interep.js/blob/main/LICENSE">
        <img alt="Github license" src="https://img.shields.io/github/license/interep/interep.js.svg?style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/@interep/identity">
        <img alt="NPM version" src="https://img.shields.io/npm/v/@interep/identity?style=flat-square" />
    </a>
    <a href="https://npmjs.org/package/@interep/identity">
        <img alt="Downloads" src="https://img.shields.io/npm/dm/@interep/identity.svg?style=flat-square" />
    </a>
    <a href="https://bundlephobia.com/package/@interep/identity">
        <img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/minzip/@interep/identity" />
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
        <a href="https://js.interep.link/identity">
            🕹 Demo
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://docs.interep.link/contributing">
            👥 Contributing
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://docs.interep.link/code-of-conduct">
            🤝 Code of conduct
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://t.me/interep">
            🗣️ Chat &amp; Support
        </a>
    </h4>
</div>

The `@interep/identity` package allows you to create Semaphore identities by deriving them from a message signed with an Ethereum account. The identity can be used to generate identity commitments and other parameters needed to create zero-knowledge proofs with Semaphore.

---

## 🛠 Install

### npm or yarn

Install the `@interep/semithid` package with npm:

```bash
npm i @interep/identity --save
```

or yarn:

```bash
yarn add @interep/identity
```

## 📜 Usage

\# **identity**(sign: _(message: string) => Promise\<string\>_, provider: _string_, nonce?: _number_): _ZKIdentity_

```typescript
import createIdentity from "@interep/identity"
import { ZkIdentity } from "@libsem/identity"
import detectEthereumProvider from "@metamask/detect-provider"
import { ethers } from "ethers"

const ethereumProvider = (await detectEthereumProvider()) as any
const provider = new ethers.providers.Web3Provider(ethereumProvider)
const signer = provider.getSigner()

const identity: ZkIdentity = await createIdentity((message) => signer.signMessage(message), "twitter")
```
