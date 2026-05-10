# Progress Bar
[![tests](https://img.shields.io/github/actions/workflow/status/mycelial-systems/progress-bar/nodejs.yml?style=flat-square)](https://github.com/mycelial-systems/progress-bar/actions/workflows/nodejs.yml)
[![types](https://img.shields.io/npm/types/@substrate-system/progress-bar?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![install size](https://flat.badgen.net/packagephobia/install/@mycelial-systems/progress-bar?cache-control=no-cache)](https://packagephobia.com/result?p=@mycelial-systems/progress-bar)
[![GZip size](https://flat.badgen.net/bundlephobia/minzip/@substrate-system/progress-bar)](https://bundlephobia.com/package/@substrate-system/progress-bar)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![Common Changelog](https://nichoth.github.io/badge/common-changelog.svg)](./CHANGELOG.md)
[![license](https://img.shields.io/badge/license-Big_Time-blue?style=flat-square)](LICENSE)


A web component for visual progress of some sort.

[See a live demo](https://mycelial-systems.github.io/progress-bar/)

<details><summary><h2>Contents</h2></summary>

<!-- toc -->

- [Install](#install)
- [Example](#example)
- [API](#api)
  * [ESM](#esm)
  * [Common JS](#common-js)
  * [Attributes](#attributes)
  * [Events](#events)
- [CSS](#css)
  * [Import CSS](#import-css)
  * [Customize CSS via some variables](#customize-css-via-some-variables)
- [Use](#use)
  * [JS](#js)
  * [HTML](#html)
  * [pre-built](#pre-built)

<!-- tocstop -->

</details>

## Install

```sh
npm i -S @substrate-system/progress-bar
```

## Example

```ts
```

## API

This exposes ESM and common JS via
[package.json `exports` field](https://nodejs.org/api/packages.html#exports).

### ESM
```js
import '@substrate-system/progress-bar'
```

### Common JS
```js
require('@substrate-system/progress-bar')
```

### Attributes

`<all attributes here>`

### Events

`<all events here>`


## CSS

### Import CSS

```js
import '@substrate-system/progress-bar/css'
```

Or minified:
```js
import '@substrate-system/progress-bar/min/css'
```

### Customize CSS via some variables

```css
progress-bar {
    --example: pink;
}
```

## Use
This calls the global function `customElements.define`. Just import, then use
the tag in your HTML.

### JS
```js
import '@substrate-system/progress-bar'
```

### HTML
```html
<div>
    <progress-bar></progress-bar>
</div>
```

### pre-built

This package exposes minified JS and CSS files too. Copy them to a location that is
accessible to your web server, then link to them in HTML.

#### copy
```sh
cp ./node_modules/@substrate-system/progress-bar/dist/index.min.js ./public/progress-bar.min.js
cp ./node_modules/@substrate-system/progress-bar/dist/style.min.css ./public/progress-bar.css
```

#### HTML
```html
<head>
    <link rel="stylesheet" href="./progress-bar.css">
</head>
<body>
    <!-- ... -->
    <script type="module" src="./progress-bar.min.js"></script>
</body>
```
