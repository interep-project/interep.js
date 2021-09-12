<p align="center">
    <h1 align="center">
        Semaphore Ethereum identities
    </h1>
    <p align="center">A simple JS library to create Semaphore identity by deriving the EdDSA keys from an Ethereum account.</p>
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
        <a href="https://github.com/InterRep/interrep.js/blob/main/CONTRIBUTING.md">
            👥 Contributing
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://github.com/InterRep/interrep.js/blob/main/code_of_conduct.md">
            🤝 Code of conduct
        </a>
    </h4>
</div>

___

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

\# **semethid**(sign: _(message: string) => Promise\<string\>_, groupId: _string_, nonce?: _number_): _Identity_

```typescript
import semethid from "@interrep/semethid"
import { Identity } from "semaphore-lib"
import detectEthereumProvider from "@metamask/detect-provider"
import { ethers } from "ethers"

const ethereumProvider = await detectEthereumProvider() as any
const provider = new ethers.providers.Web3Provider(ethereumProvider)
const signer = provider.getSigner()

function sign(message: string): Promise<string> {
    return signer.signMessage(message)
}

const identity: Identity = await semethid(sign, "groupId")
*/
```
