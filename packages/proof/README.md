<p align="center">
    <h1 align="center">
        Interep proofs
    </h1>
    <p align="center">A simple JS function to create Semaphore proofs.</p>
</p>

<p align="center">
    <a href="https://github.com/interep-project">
        <img src="https://img.shields.io/badge/project-Interep-blue.svg?style=flat-square">
    </a>
    <a href="https://github.com/interep-project/interep.js/blob/main/LICENSE">
        <img alt="Github license" src="https://img.shields.io/github/license/interep-project/interep.js.svg?style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/@interep/proof">
        <img alt="NPM version" src="https://img.shields.io/npm/v/@interep/proof?style=flat-square" />
    </a>
    <a href="https://npmjs.org/package/@interep/proof">
        <img alt="Downloads" src="https://img.shields.io/npm/dm/@interep/proof.svg?style=flat-square" />
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

---

## 🛠 Install

### npm or yarn

Install the `@interep/semithid` package with npm:

```bash
npm i @interep/proof --save
```

or yarn:

```bash
yarn add @interep/proof
```

## 📜 Usage

\# **createProof**(identity: _ZKIdentity_, groupId: _GroupId_, externalNullifier: _BigNumber_, signal: _string_, zkFiles: _zkFiles_): _any\[]_

```typescript
import createIdentity from "@interep/identity"
import createProof from "@interep/proof"
import detectEthereumProvider from "@metamask/detect-provider"
import { ethers } from "ethers"

const ethereumProvider = (await detectEthereumProvider()) as any
const provider = new ethers.providers.Web3Provider(ethereumProvider)
const signer = provider.getSigner()

const identity = await createIdentity((message) => signer.signMessage(message), "<group-id>") // or <group-provider> for offchain groups.

const groupId = BigInt(formatBytes32String("<group-id>")) // or { provider: "<group-provider>", name: "<group-name>" } for offchain groups.
const externalNullifier = 1
const signal = "Hello World"
const zkFiles = {
    wasmFilePath: "./semaphore.wasm",
    zkeyFilePath: "./semaphore_final.zkey"
}

const proof = await createProof(identity, groupId, externalNullifier, signal, zkFiles)
```
