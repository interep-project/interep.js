<p align="center">
    <h1 align="center">
        InterRep reputation criteria
    </h1>
    <p align="center">Definitions and utility functions of InterRep reputation criteria.</p>
</p>

<p align="center">
    <a href="https://github.com/InterRep">
        <img src="https://img.shields.io/badge/project-InterRep-blue.svg?style=flat-square">
    </a>
    <a href="https://github.com/interrep/interrep.js/blob/main/LICENSE">
        <img alt="Github license" src="https://img.shields.io/github/license/interrep/interrep.js.svg?style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/@interrep/reputation-criteria">
        <img alt="NPM version" src="https://img.shields.io/npm/v/@interrep/reputation-criteria?style=flat-square" />
    </a>
    <a href="https://npmjs.org/package/@interrep/reputation-criteria">
        <img alt="Downloads" src="https://img.shields.io/npm/dm/@interrep/reputation-criteria.svg?style=flat-square" />
    </a>
    <a href="https://bundlephobia.com/package/@interrep/reputation-criteria">
        <img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/minzip/@interrep/reputation-criteria" />
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
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://docs.interrep.link/contributing">
            👥 Contributing
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://docs.interrep.link/code-of-conduct">
            🤝 Code of conduct
        </a>
    </h4>
</div>

---

## 🛠 Install

### npm or yarn

Install the `@interrep/reputation-criteria` package with npm:

```bash
npm i @interrep/reputation-criteria --save
```

or yarn:

```bash
yarn add @interrep/reputation-criteria
```

### CDN

You can also load it using a `script` tag using [unpkg](https://unpkg.com/):

```html
<script src="https://unpkg.com/@interrep/reputation-criteria/"></script>
```

or [JSDelivr](https://www.jsdelivr.com/):

```html
<script src="https://cdn.jsdelivr.net/npm/@interrep/reputation-criteria/"></script>
```

## 📜 Usage

\# **calculateReputation**(platform: _Platform_, parameters: _TwitterParameters_): _ReputationLevel_

```typescript
import { calculateReputation, Platform } from "@interrep/reputation-criteria"

const reputation = calculateReputation(Platform.TWITTER, { followers: 7000 })

console.log(reputation) // "GOLD"
```

\# **getReputationLevels**(platform?: _Platform_): _ReputationLevel[]_

```typescript
import { getReputationLevels, Platform } from "@interrep/reputation-criteria"

const reputationLevels = getReputationLevels(Platform.GITHUB)

console.log(reputationLevels) // ["GOLD", "SILVER", "BRONZE", "NOT_SUFFICIENT"]
```

\# **getPlatforms**(): _Platform[]_

```typescript
import { getPlatforms } from "@interrep/reputation-criteria"

const platforms = getPlatforms()

console.log(platforms) // ["twitter", "github"]
```
