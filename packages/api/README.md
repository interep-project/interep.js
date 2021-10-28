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
const devApi = new API("development")

console.log(api.url) // "https://kovan.interrep.link/api"
console.log(devApi.url) // "http://localhost:3000/api"
```

\# **api.getGroups**(): _Promise<any[]>_

```typescript
const groups = await api.getGroups()
```

> API: [api/groups](https://docs.interrep.link/api#apigroups)

\# **api.getProviders**(): _Promise<string[]>_

```typescript
const providers = await api.getProviders()
```

> API: [api/providers](https://docs.interrep.link/api#apiproviders)

\# **api.checkIdentityCommitment**(parameters: _CheckIdentityCommitmentRequest_): _Promise<boolean\>_

```typescript
// For any provider group.
await api.checkIdentityCommitment({
    provider: "twitter",
    identityCommitment: "1231231..."
})
```

> API: [/api/providers/:provider/:identityCommitment/check](https://docs.interrep.link/api#apiprovidersprovideridentitycommitmentcheck)

```typescript
// For specific group.
await api.checkIdentityCommitment({
    provider: "twitter",
    name: "GOLD",
    identityCommitment: "1231231..."
})
```

> API: [/api/groups/:provider/:name/:identityCommitment/check](https://docs.interrep.link/api#apigroupsprovidernameidentitycommitmentcheck)

\# **api.addIdentityCommitment**(parameters: _AddIdentityCommitmentRequest_): Promise<_string[]_>

```typescript
// For Web2 providers.
const rootHash = await api.addIdentityCommitment({
    provider: "twitter",
    name: "GOLD",
    identityCommitment: "1231231...",
    authenticationHeader: "token <OAuth-token>"
})
```

```typescript
// For Web3 providers.
const rootHash = await api.addIdentityCommitment({
    provider: "poap",
    name: "DEVCON_4",
    identityCommitment: "1231231...",
    userAddress: "0xueaoueao",
    userSignature: "aueouaoe"
})
```

> API: [/api/groups/:provider/:name/:identityCommitment](https://docs.interrep.link/api#apigroupsprovidernameidentitycommitment)

\# **api.getMerkleTreePath**(parameters: _GetMerkleTreePathRequest_): Promise<_any_>

```typescript
const rootHash = await api.getMerkleTreePath({
    provider: "twitter",
    name: "GOLD",
    identityCommitment: "1231231..."
})
```

> API: [/api/groups/:provider/:name/:identityCommitment/path](https://docs.interrep.link/api#apigroupsprovidernameidentitycommitmentpath)
