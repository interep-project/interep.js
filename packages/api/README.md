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

### NPM or Yarn

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
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://unpkg.com/@interrep/api/"></script>
```

or [JSDelivr](https://www.jsdelivr.com/):

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
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

\# **api.getProviders**(): _Promise<string[]>_

```typescript
const providers = await api.getProviders()
```

> API: [api/providers](https://docs.interrep.link/api#apiproviders)

\# **api.getGroups**(): _Promise<any[]>_

```typescript
const groups = await api.getGroups()
```

> API: [api/groups](https://docs.interrep.link/api#apigroups)

\# **api.getGroup**(parameters: _GetGroupRequest_): _Promise<any>_

```typescript
const group = await api.getGroup({
    provider: "twitter",
    name: "gold"
})
```

> API: [/api/groups/:provider/:name](https://docs.interrep.link/api#apigroupsprovidername)

\# **api.hasIdentityCommitment**(parameters: _HasIdentityCommitmentRequest_): _Promise<boolean\>_

```typescript
// For any provider group.
const hasIdentityCommitment = await api.hasIdentityCommitment({
    provider: "twitter",
    identityCommitment: "1231231..."
})
```

> API: [/api/providers/:provider/:identityCommitment](https://docs.interrep.link/api#apiprovidersprovideridentitycommitment)

```typescript
// For specific group.
const hasIdentityCommitment = await api.hasIdentityCommitment({
    provider: "twitter",
    name: "gold",
    identityCommitment: "1231231..."
})
```

> API (method: get): [/api/groups/:provider/:name/:identityCommitment](https://docs.interrep.link/api#apigroupsprovidernameidentitycommitment)

\# **api.addIdentityCommitment**(parameters: _AddIdentityCommitmentRequest_): _Promise<boolean\>_

```typescript
// For Web2 providers.
await api.addIdentityCommitment({
    provider: "twitter",
    name: "gold",
    identityCommitment: "1231231...",
    authenticationHeader: "token <OAuth-token>"
})
```

```typescript
// For Web3 providers.
await api.addIdentityCommitment({
    provider: "poap",
    name: "devcon4",
    identityCommitment: "1231231...",
    userAddress: "0xueaoueao",
    userSignature: "aueouaoe"
})
```

> API (method: post): [/api/groups/:provider/:name/:identityCommitment](https://docs.interrep.link/api#apigroupsprovidernameidentitycommitment)

\# **api.deleteIdentityCommitment**(parameters: _DeleteIdentityCommitmentRequest_): _Promise<boolean\>_

```typescript
// For Web2 providers.
await api.deleteIdentityCommitment({
    provider: "twitter",
    name: "gold",
    identityCommitment: "1231231...",
    authenticationHeader: "token <OAuth-token>"
})
```

```typescript
// For Web3 providers.
await api.deleteIdentityCommitment({
    provider: "poap",
    name: "devcon4",
    identityCommitment: "1231231...",
    userAddress: "0xueaoueao",
    userSignature: "aueouaoe"
})
```

> API (method: delete): [/api/groups/:provider/:name/:identityCommitment](https://docs.interrep.link/api#apigroupsprovidernameidentitycommitment)

\# **api.getMerkleTreeLeaves**(parameters: _GetMerkleTreeLeavesRequest_, options: _RequestOptions_): _Promise<any[]\>_

```typescript
const leaves = await api.getMerkleTreeLeaves(
    {
        rootHash: "1212121..."
    },
    {
        limit: 10
    }
)
```

> API: [/api/trees/:rootHash](https://docs.interrep.link/api#apitreesroothash)

\# **api.hasMerkleTreeLeaf**(parameters: _HasMerkleTreeLeafRequest_): _Promise<boolean\>_

```typescript
const hasMerkleTreeLeaf = await api.hasMerkleTreeLeaf({
    rootHash: "1212121...",
    leafHash: "2122131..."
})
```

> API: [/api/trees/:rootHash/:leafHash](https://docs.interrep.link/api#apitreesroothashleafhash)

\# **api.getMerkleTreeProof**(parameters: _GetMerkleTreeProofRequest_): _Promise<any\>_

```typescript
const proof = await api.getMerkleTreePath({
    rootHash: "1212121...",
    leafHash: "2122131..."
})
```

> API: [/api/trees/:rootHash/:leafHash/proof](https://docs.interrep.link/api#apitreesroothashleafhashproof)

\# **api.getMerkleTreeRootBatches**(): _Promise<any[]\>_

```typescript
const rootBatches = await api.getMerkleTreeRootBatches()
```

> API: [/api/trees/batches](https://docs.interrep.link/api#apitreesbatches)

\# **api.getMerkleTreeRootBatch**(parameters: _GetMerkleTreeRootBatchRequest_): _Promise<any\>_

```typescript
const rootBatch = await api.getMerkleTreeRootBatch({
    rootHash: "1212121..."
})
```

> API: [/api/trees/batches/:rootHash](https://docs.interrep.link/api#apitreesbatchesroothash)
