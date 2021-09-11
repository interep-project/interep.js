<p align="center">
    <h1 align="center">
        Semaphore Ethereum identities
    </h1>
    <p align="center">A simple JS library to create Semaphore identity by deriving the EdDSA keys from an Ethereum account.</p>
</p>

<p align="center">
    <a href="https://github.com/InterRep" target="_blank">
        <img src="https://img.shields.io/badge/project-InterRep-blue.svg?style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/@interrep/semethid" target="_blank">
        <img alt="NPM version" src="https://img.shields.io/npm/v/@interrep/semethid?style=flat-square">
    </a>
    <a href="https://github.com/interrep/interrep.js/blob/main/LICENSE" target="_blank">
        <img alt="Github license" src="https://img.shields.io/github/license/interrep/interrep.js.svg?style=flat-square">
    </a>
    <a href="https://eslint.org/" target="_blank">
        <img alt="Linter eslint" src="https://img.shields.io/badge/linter-eslint-8080f2?style=flat-square&logo=eslint">
    </a>
    <a href="https://prettier.io/" target="_blank">
        <img alt="Code style prettier" src="https://img.shields.io/badge/code%20style-prettier-f8bc45?style=flat-square&logo=prettier">
    </a>
    <img alt="NPM bundle size" src="https://img.shields.io/bundlephobia/min/@interrep/semethid?style=flat-square">
</p>

## Table of Contents

-   🛠 [Install](#install)
-   📜 [Usage](#usage)
-   🧾 [MIT License](https://github.com/interrep/interrep.js/blob/main/LICENSE)
-   ☎️ [Contacts](#contacts)
    -   [Developers](#developers)

## Install

### npm or yarn

You can install the `@interrep/semithid` package with npm:

```bash
npm i @interrep/semethid --save
```

or with yarn:

```bash
yarn add @interrep/semethid
```

## Usage

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

## Contacts

### Developers

-   e-mail : me@cedoor.dev
-   github : [@cedoor](https://github.com/cedoor)
-   website : https://cedoor.dev
