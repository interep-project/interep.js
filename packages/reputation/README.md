<p align="center">
    <h1 align="center">
        Interep reputation
    </h1>
    <p align="center">Definitions and utility functions of Interep reputation.</p>
</p>

<p align="center">
    <a href="https://github.com/interep-project">
        <img src="https://img.shields.io/badge/project-Interep-blue.svg?style=flat-square">
    </a>
    <a href="https://github.com/interep-project/interep.js/blob/main/LICENSE">
        <img alt="Github license" src="https://img.shields.io/github/license/interep-project/interep.js.svg?style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/@interep/reputation">
        <img alt="NPM version" src="https://img.shields.io/npm/v/@interep/reputation?style=flat-square" />
    </a>
    <a href="https://npmjs.org/package/@interep/reputation">
        <img alt="Downloads" src="https://img.shields.io/npm/dm/@interep/reputation.svg?style=flat-square" />
    </a>
    <a href="https://bundlephobia.com/package/@interep/reputation">
        <img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/minzip/@interep/reputation" />
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
        <a href="https://discord.gg/Tp9He7qws4">
            🗣️ Chat &amp; Support
        </a>
    </h4>
</div>

---

## 🛠 Install

### npm or yarn

Install the `@interep/reputation` package with npm:

```bash
npm i @interep/reputation --save
```

or yarn:

```bash
yarn add @interep/reputation
```

### CDN

You can also load it using a `script` tag using [unpkg](https://unpkg.com/):

```html
<script src="https://unpkg.com/@interep/reputation/"></script>
```

or [JSDelivr](https://www.jsdelivr.com/):

```html
<script src="https://cdn.jsdelivr.net/npm/@interep/reputation/"></script>
```

## 📜 Usage

\# **calculateReputation**(provider: _OAuthProvider_, parameters: _TwitterParameters_): _ReputationLevel_

```typescript
import { calculateReputation, OAuthProvider } from "@interep/reputation"

const reputation = calculateReputation(OAuthProvider.TWITTER, { followers: 7000 })

console.log(reputation) // "GOLD"
```

\# **getReputationLevels**(provider?: _OAuthProvider_): _ReputationLevel[]_

```typescript
import { getReputationLevels, OAuthProvider } from "@interep/reputation"

const reputationLevels = getReputationLevels(OAuthProvider.GITHUB)

console.log(reputationLevels) // ["GOLD", "SILVER", "BRONZE", "NOT_SUFFICIENT"]
```

\# **getOAuthProviders**(): _OAuthProvider[]_

```typescript
import { getOAuthProviders } from "@interep/reputation"

const providers = getOAuthProviders()

console.log(providers) // ["twitter", "github", "reddit"]
```
