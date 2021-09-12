<p align="center">
    <h1 align="center">
        InterRep.JS
    </h1>
    <p align="center">A monorepo of InterRep JavaScript libraries.</p>
</p>

<p align="center">
    <a href="https://github.com/InterRep">
        <img src="https://img.shields.io/badge/project-InterRep-blue.svg?style=flat-square">
    </a>
    <a href="https://github.com/interrep/interrep.js/blob/main/LICENSE">
        <img alt="Github license" src="https://img.shields.io/github/license/interrep/interrep.js.svg?style=flat-square">
    </a>
    <a href="https://github.com/interrep/interrep.js/actions?query=workflow%3Atest">
        <img alt="GitHub Workflow test" src="https://img.shields.io/github/workflow/status/interrep/interrep.js/test?label=test&style=flat-square&logo=github">
    </a>
    <a href="https://coveralls.io/github/InterRep/interrep.js">
        <img alt="Coveralls" src="https://img.shields.io/coveralls/github/InterRep/interrep.js?style=flat-square&logo=coveralls">
    </a>
    <a href="https://eslint.org/">
        <img alt="Linter eslint" src="https://img.shields.io/badge/linter-eslint-8080f2?style=flat-square&logo=eslint">
    </a>
    <a href="https://prettier.io/">
        <img alt="Code style prettier" src="https://img.shields.io/badge/code%20style-prettier-f8bc45?style=flat-square&logo=prettier">
    </a>
    <a href="https://lerna.js.org/">
        <img alt="Lerna" src="https://img.shields.io/badge/maintained%20with-lerna-8f6899.svg?style=flat-square">
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
    </h4>
</div>

___

## 📦 Packages

<table>
  <th>Package</th>
  <th>Version</th>
  <th>Downloads</th>
  <th>Size</th>
  <th>Demo</th>
  <tbody>
    <tr>
      <td>
        <a href="https://github.com/InterRep/interrep.js/tree/main/packages/semethid">
          @interrep/semethid
        </a>
      </td>
      <td>
        <!-- NPM version -->
        <a href="https://npmjs.org/package/@interrep/semethid">
          <img src="https://img.shields.io/npm/v/@interrep/semethid.svg?style=flat-square" alt="NPM version" />
        </a>
      </td>
      <td>
        <!-- Downloads -->
        <a href="https://npmjs.org/package/@interrep/semethid">
          <img src="https://img.shields.io/npm/dm/@interrep/semethid.svg?style=flat-square" alt="Downloads" />
        </a>
      </td>
      <td>
        <!-- Size -->
        <a href="https://bundlephobia.com/package/@interrep/semethid">
          <img src="https://img.shields.io/bundlephobia/minzip/@interrep/semethid" alt="npm bundle size (scoped)" />
        </a>
      </td>
      <td>
        <!-- Demo -->
        <a href="https://js.interrep.link/semethid/">
            js.interrep.link/semethid
        </a>
      </td>
    </tr>
  <tbody>
</table>

## 🛠 Install

Clone this repository and install the dependencies:

```bash
$ git clone https://github.com/InterRep/interrep.js.git
$ cd interrep.js && yarn
```

## 📜 Usage

```bash
$ yarn lint # Lint all packages.
$ yarn test # Test all packages (with common coverage).
$ yarn build # Create a JS build for each package.
$ yarn gh-pages # Create a new gh-page build for each package (where a demo exists).
$ yarn lerna publish from-package # Publish packages on npm.
```

You can see the other npm scripts in the `package.json` file.
