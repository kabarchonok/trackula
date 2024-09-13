# Getting Started

## Installation

::: code-group

```sh [npm]
npm install trackula
```

```sh [yarn]
yarn add trackula
```

```sh [pnpm]
pnpm add trackula
```

```sh [bun]
bun add trackula
```

:::

## Usage Example

To make the library work, you need to call the `.init()` method

```js
import _trackula from 'trackula'

const trackula = _trackula()

trackula.init()
```

The library adds `data-trackula-input` attributes to the `html` which can have the following values:

- `initial` – the default value, indicating that the library probably couldn't get access to listen for interactivity (e.g., ssr).
- `mouse`
- `keyboard`
- `touch`

### Working with methods

You can also directly call the library using `.getInput` method.

```js
const trackula = _trackula()

trackula.init()

trackula.getInput() // returns initial, mouse, keyboard, or touch depending on user behavior
```

### Working with styles

Based on the input type, you can customize the appearance of your elements:

```css
[data-trackula-input="mouse"] button:focus {
    outline: 4px #e3dafd;
}

[data-trackula-input="keyboard"] button:focus {
    outline: 4px #fddadc;
}

[data-trackula-input="touch"] button:focus {
    outline: 4px #dafddf;
}
```
