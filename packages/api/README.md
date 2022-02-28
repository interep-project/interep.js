<p align="center">
    <h1 align="center">
        Interep API
    </h1>
    <p align="center">A JS library to wrap the APIs from the Interep reputation service and subgraph.</p>
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
        <a href="https://t.me/interrep">
            🗣️ Chat &amp; Support
        </a>
    </h4>
</div>

Interep provides [HTTP endpoints](https://docs.interep.link/api#reputation-service) to interact with our reputation service and [HTTP/WS endpoints](https://docs.interep.link/api#subgraph) to access onchain data with our subgraph. This library allows you to use these APIs in a simple way.

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

### Offchain APIs

\# **new OffchainAPI**(environment: _Environment_): _OffchainAPI_

```typescript
import { OffchainAPI } from "@interep/api"

const api = new OffchainAPI()
const devApi = new OffchainAPI("development")

console.log(api.url) // "https://kovan.interep.link/api"
console.log(devApi.url) // "http://localhost:3000/api"
```

\# **api.getProviders**(): _Promise<string[]>_

```typescript
const providers = await api.getProviders()
```

> API: [api/providers](https://docs.interep.link/api#apiproviders)

\# **api.getGroups**(): _Promise<any[]>_

```typescript
const groups = await api.getGroups()
```

> API: [api/groups](https://docs.interep.link/api#apigroups)

\# **api.getGroup**(parameters: _Offchain.GetGroupRequest_): _Promise<any\>_

```typescript
const group = await api.getGroup({
    provider: "twitter",
    name: "gold"
})
```

> API: [/api/groups/:provider/:name](https://docs.interep.link/api#apigroupsprovidername)

\# **api.hasMember**(parameters: _Offchain.HasMemberRequest_): _Promise<boolean\>_

```typescript
// For any provider group.
const hasMember = await api.hasMember({
    provider: "twitter",
    identityCommitment: "1231231..."
})
```

> API: [/api/providers/:provider/:identityCommitment](https://docs.interep.link/api#apiprovidersprovideridentitycommitment)

```typescript
// For specific group.
const hasMember = await api.hasMember({
    provider: "twitter",
    name: "gold",
    identityCommitment: "1231231..."
})
```

> API (method: get): [/api/groups/:provider/:name/:identityCommitment](https://docs.interep.link/api#apigroupsprovidernameidentitycommitment)

\# **api.addMember**(parameters: _Offchain.AddMemberRequest_): _Promise<boolean\>_

```typescript
// For Web2 providers.
await api.addMember({
    provider: "twitter",
    name: "gold",
    identityCommitment: "1231231...",
    authenticationHeader: "token <OAuth-token>"
})
```

```typescript
// For Web3 providers.
await api.addMember({
    provider: "poap",
    name: "devcon4",
    identityCommitment: "1231231...",
    userAddress: "0xueaoueao",
    userSignature: "aueouaoe"
})
```

> API (method: post): [/api/groups/:provider/:name/:identityCommitment](https://docs.interep.link/api#apigroupsprovidernameidentitycommitment)

\# **api.removeMember**(parameters: _Offchain.RemoveMemberRequest_): _Promise<boolean\>_

```typescript
// For Web2 providers.
await api.removeMember({
    provider: "twitter",
    name: "gold",
    identityCommitment: "1231231...",
    authenticationHeader: "token <OAuth-token>"
})
```

```typescript
// For Web3 providers.
await api.removeMember({
    provider: "poap",
    name: "devcon4",
    identityCommitment: "1231231...",
    userAddress: "0xueaoueao",
    userSignature: "aueouaoe"
})
```

> API (method: delete): [/api/groups/:provider/:name/:identityCommitment](https://docs.interep.link/api#apigroupsprovidernameidentitycommitment)

\# **api.getMerkleTreeProof**(parameters: _Offchain.GetMerkleTreeProofRequest_): _Promise<any\>_

```typescript
const proof = await api.getMerkleTreeProof({
    provider: "twitter",
    name: "gold",
    identityCommitment: "1231231..."
})
```

> API: [/api/groups/:provider/:name/:identityCommitment/proof](https://docs.interep.link/api#apigroupsprovidernameidentitycommitmentproof)

\# **api.getMerkleTreeLeaves**(parameters: _Offchain.GetMerkleTreeLeavesRequest_, options: _RequestOptions_): _Promise<string[]\>_

```typescript
const leaves = await api.getMerkleTreeLeaves(
    {
        root: "1212121..."
    },
    {
        limit: 10
    }
)
```

> API: [/api/trees/:root](https://docs.interep.link/api#apitreesroot)

\# **api.hasMerkleTreeLeaf**(parameters: _Offchain.HasMerkleTreeLeafRequest_): _Promise<boolean\>_

```typescript
const hasMerkleTreeLeaf = await api.hasMerkleTreeLeaf({
    root: "1212121...",
    leaf: "2122131..."
})
```

> API: [/api/trees/:root/:leaf](https://docs.interep.link/api#apitreesrootleaf)

\# **api.getMerkleTreeRootBatches**(): _Promise<any[]\>_

```typescript
const rootBatches = await api.getMerkleTreeRootBatches()
```

> API: [/api/trees/batches](https://docs.interep.link/api#apitreesbatches)

\# **api.getMerkleTreeRootBatch**(parameters: _Offchain.GetMerkleTreeRootBatchRequest_): _Promise<any\>_

```typescript
const rootBatch = await api.getMerkleTreeRootBatch({
    root: "1212121..."
})
```

> API: [/api/trees/batches/:root](https://docs.interep.link/api#apitreesbatchesroot)

### Onchain APIs

\# **new OnchainAPI**(): _OnchainAPI_

```typescript
import { OnchainAPI } from "@interep/api"

const api = new OnchainAPI()

console.log(api.url) // "https://api.thegraph.com/subgraphs/name/interep-project/interep-groups-kovan"
```

\# **api.getGroups**(): _Promise<any[]>_

```typescript
const groups = await api.getGroups()
```

> Subgraph entity: [OnchainGroup](https://docs.interep.link/api#onchaingroup)

\# **api.getGroup**(parameters: _Onchain.GetGroupRequest_): _Promise<any[]>_

```typescript
const group = await api.getGroup({
    id: "1"
})
```

> Subgraph entity: [OnchainGroup](https://docs.interep.link/api#onchaingroup)

\# **api.getMembers**(parameters: _Onchain.GetMembersRequest_): _Promise<any[]>_

```typescript
const members = await api.getMembers({
    groupId: "1"
})
```

> Subgraph entity: [Member](https://docs.interep.link/api#member)
