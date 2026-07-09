# Progress Bar
[![tests](https://img.shields.io/github/actions/workflow/status/mycelial-systems/progress-bar/nodejs.yml?style=flat-square)](https://github.com/mycelial-systems/progress-bar/actions/workflows/nodejs.yml)
[![types](https://img.shields.io/npm/types/@substrate-system/progress-bar?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![install size](https://flat.badgen.net/packagephobia/install/@substrate-system/progress-bar?cache-control=no-cache)](https://packagephobia.com/result?p=@substrate-system/progress-bar)
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
- [Modules](#modules)
  * [ESM](#esm)
  * [Common JS](#common-js)
  * [Attributes](#attributes)
  * [Events](#events)
- [CSS](#css)
  * [Import CSS](#import-css)
  * [Customize CSS via variables](#customize-css-via-variables)
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

Use a `fetch` call for progress events.

```ts
// fetch with body stream + Content-Length
import { signal, batch } from '@preact/signals'

const state = {
  progress: signal(0),
  fetchStatus: signal('')
}

async function runFetch () {
    batch(() => {
        state.progress.value = 0
        state.fetchStatus.value = 'fetching...'
    })

    try {
        const res = await fetch(IMG_URL)
        if (!res.ok || !res.body) {
            throw new Error('bad response: ' + res.status)
        }

        const total = Number(res.headers.get('Content-Length')) || 0
        const reader = res.body.getReader()
        let received = 0

        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            received += value.byteLength
            if (total > 0) {
                state.progress.value = (received / total) * 100
            }
        }

        batch(() => {
            state.progress.value = 100
            state.fetchStatus.value = `done (${received} bytes)`
        })
    } catch (err) {
        state.fetchStatus.value = 'error: ' + (err as Error).message
    }
}
```

## Modules

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

## API

### Attributes

#### `progress`

A number from `0` to `100` that sets the fill width.

```html
<progress-bar progress="42"></progress-bar>
```

The value is parsed with `Number()` and written to the element's
`--progress` CSS variable as a percentage.

|     Value      | Result |
|      ---       |  ---   |
|     missing    |  `0%`  |
|       `42`     |  `42%` |
|     `99.5`     | `99.5%`|
|     `150`      | `100%` |
|     `-10`      |  `0%`  |
| `not-a-number` |  `0%`  |

Changing the attribute updates the CSS variable immediately.

```js
const bar = document.querySelector('progress-bar')

bar?.setAttribute('progress', '73')
```

### Events

This component does not dispatch custom events. Progress events come from
the underlying operation.


## CSS

### Import CSS

```js
import '@substrate-system/progress-bar/css'
```

Or minified:
```js
import '@substrate-system/progress-bar/min/css'
```

### Customize CSS via variables

These are the defaults:

```css
progress-bar {
  --progress-bar-color: #29d;
  --progress: 0%;
  --progress-height: 3px;
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
    <!-- progress attributes is percentage -->
    <progress-bar progress="10"></progress-bar>
</div>
```

### pre-built

This package exposes minified JS and CSS files too. Copy them to a location
that is accessible to your web server, then link to them in HTML.

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
