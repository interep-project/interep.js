<p align="center">
    <h1 align="center">
        Interep API
    </h1>
    <p align="center">A JS library to wrap the APIs from the Interep reputation service.</p>
</p>

<p align="center">
    <a href="https://github.com/interep-project">
        <img src="https://img.shields.io/badge/project-Interep-blue.svg?style=flat-square">
    </a>
    <a href="https://github.com/interep-project/interep.js/blob/main/LICENSE">
        <img alt="Github license" src="https://img.shields.io/github/license/interep-project/interep.js.svg?style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/@interep/api">
        <img alt="NPM version" src="https://img.shields.io/npm/v/@interep/api?style=flat-square" />
    </a>
    <a href="https://npmjs.org/package/@interep/api">
        <img alt="Downloads" src="https://img.shields.io/npm/dm/@interep/api.svg?style=flat-square" />
    </a>
    <a href="https://bundlephobia.com/package/@interep/api">
        <img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/minzip/@interep/api" />
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
        <a href="https://appliedzkp.org/discord">
            🗣️ Chat &amp; Support
        </a>
    </h4>
</div>

Interep provides [HTTP endpoints](https://docs.interep.link/api#reputation-service) to interact with the reputation service. This library allows you to use those APIs with a simple JavaScript library.

---

## 🛠 Install

### NPM or Yarn

Install the `@interep/api` package with npm:

```bash
npm i @interep/api --save
```

or yarn:

```bash
yarn add @interep/api
```

### CDN

You can also load it using a `script` tag using [unpkg](https://unpkg.com/):

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://unpkg.com/@interep/api/"></script>
```

or [JSDelivr](https://www.jsdelivr.com/):

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@interep/api/"></script>
```

## 📜 Usage

\# **new API**(network: _Network_): _API_

```typescript
import { API } from "@interep/api"

const api = new API()
const goerliApi = new API("goerli")
const kovanApi = new API("kovan")
const localApi = new API("local")

console.log(api.url) // "https://app.interep.link/api/v1"
console.log(goerliApi.url) // "https://goerli.interep.link/api/v1"
console.log(kovanApi.url) // "https://kovan.interep.link/api/v1"
console.log(localApi.url) // "http://localhost:3000/api/v1"
```

\# **api.getProviders**(): _Promise<string[]>_

```typescript
const providers = await api.getProviders()
```

> API: [api/v1/providers](https://docs.interep.link/api#apiv1providers)

\# **api.getGroups**(): _Promise<any[]>_

```typescript
const groups = await api.getGroups()
```

> API: [api/v1/groups](https://docs.interep.link/api#apiv1groups)

\# **api.getGroup**(parameters: _GetGroupRequest_): _Promise<any\>_

```typescript
const group = await api.getGroup({
    provider: "twitter",
    name: "gold"
})
```

> API: [/api/v1/groups/:provider/:name](https://docs.interep.link/api#apiv1groupsprovidername)

\# **api.getGroupMembers**(parameters: _GetGroupMembersRequest_): _Promise<string[]>_

```typescript
const members = await api.getGroupMembers({
    provider: "twitter",
    name: "gold",
    limit: 1,
    offset: 1
})
```

> API: [/api/v1/groups/:provider/:name/members](https://docs.interep.link/api#apiv1groupsprovidernamememberslimit0offset0)

\# **api.hasMember**(parameters: _HasMemberRequest_): _Promise<boolean\>_

```typescript
// For any provider group.
const hasMember = await api.hasMember({
    provider: "twitter",
    member: "1231231..."
})
```

> API: [/api/v1/providers/:provider/:member](https://docs.interep.link/api#apiv1providersprovidermember)

```typescript
// For specific group.
const hasMember = await api.hasMember({
    provider: "twitter",
    name: "gold",
    member: "1231231..."
})
```

> API (method: get): [/api/v1/groups/:provider/:name/:member](https://docs.interep.link/api#apiv1groupsprovidernamemember)

\# **api.addMember**(parameters: _AddMemberRequest_): _Promise<boolean\>_

```typescript
// For Web2 providers.
await api.addMember({
    provider: "twitter",
    name: "gold",
    member: "1231231...",
    authenticationHeader: "token <OAuth-token>"
})
```

```typescript
// For Web3 providers.
await api.addMember({
    provider: "poap",
    name: "devcon4",
    member: "1231231...",
    userAddress: "0xueaoueao",
    userSignature: "aueouaoe"
})
```

> API (method: post): [/api/v1/groups/:provider/:name/:member](https://docs.interep.link/api#apiv1groupsprovidernamemember)

\# **api.getMerkleTreeProof**(parameters: _GetMerkleTreeProofRequest_): _Promise<any\>_

```typescript
const proof = await api.getMerkleTreeProof({
    provider: "twitter",
    name: "gold",
    member: "1231231..."
})
```

> API: [/api/v1/groups/:provider/:name/:member/proof](https://docs.interep.link/api#apiv1groupsprovidernamememberproof)

\# **api.getMerkleTreeLeaves**(parameters: _GetMerkleTreeLeavesRequest_): _Promise<string[]>_

```typescript
const leaves = await api.getMerkleTreeLeaves({
    root: "1212121...",
    limit: 10
})
```

> API: [/api/v1/trees/:root](https://docs.interep.link/api#apiv1treesroot)

\# **api.hasMerkleTreeLeaf**(parameters: _HasMerkleTreeLeafRequest_): _Promise<boolean\>_

```typescript
const hasMerkleTreeLeaf = await api.hasMerkleTreeLeaf({
    root: "1212121...",
    leaf: "2122131..."
})
```

> API: [/api/v1/trees/:root/:leaf](https://docs.interep.link/api#apiv1treesrootleaf)

\# **api.getMerkleTreeRootBatches**(): _Promise<any[]\>_

```typescript
const rootBatches = await api.getMerkleTreeRootBatches()
```

> API: [/api/v1/batches](https://docs.interep.link/api#apiv1batches)

\# **api.getMerkleTreeRootBatch**(parameters: _GetMerkleTreeRootBatchRequest_): _Promise<any\>_

```typescript
const rootBatch = await api.getMerkleTreeRootBatch({
    root: "1212121..."
})
```

> API: [/api/v1/batches/:root](https://docs.interep.link/api#apiv1batchesroot)
