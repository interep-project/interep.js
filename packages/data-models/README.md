<p align="center">
    <h1 align="center">
        InterRep data models 
    </h1>
    <p align="center">Mongoose schemas and models used by InterRep.</p>
</p>

<p align="center">
    <a href="https://github.com/InterRep">
        <img src="https://img.shields.io/badge/project-InterRep-blue.svg?style=flat-square">
    </a>
    <a href="https://github.com/interrep/interrep.js/blob/main/LICENSE">
        <img alt="Github license" src="https://img.shields.io/github/license/interrep/interrep.js.svg?style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/@interrep/data-models">
        <img alt="NPM version" src="https://img.shields.io/npm/v/@interrep/data-models?style=flat-square" />
    </a>
    <a href="https://npmjs.org/package/@interrep/data-models">
        <img alt="Downloads" src="https://img.shields.io/npm/dm/@interrep/data-models.svg?style=flat-square" />
    </a>
    <a href="https://bundlephobia.com/package/@interrep/data-models">
        <img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/minzip/@interrep/data-models" />
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
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://t.me/interrep">
            🗣️ Chat &amp; Support
        </a>
    </h4>
</div>

---

## 🛠 Install

### npm or yarn

Install the `@interrep/data-models` package with npm:

```bash
npm i @interrep/data-models --save
```

or yarn:

```bash
yarn add @interrep/data-models
```

## 📜 Usage

You can find the Mongoose model of each entity on `src/<entityName>/<EntityName.model.ts>`. Each model has predefined functions and some custom static functions defined on `src/<entityName>/<EntityName>.statics.ts`. The `@interrep/data-models` package exports types and models of each entity.
