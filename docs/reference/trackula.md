# Reference

## Parameters

### `root?` <Badge type="warning" text="experimental" />

- **Type:** `HTMLElement | null`
- **Default:** `document.documentElement`
- **Description:** A container element where interactions will be tracked.
If not provided, the entire HTML document (`document.documentElement`) will be used by default.

:::danger
The current implementation of the `root` parameter might affect future work, as this property will be removed soon.
:::

```typescript
const container = document.getElementById('container')

trackula({ root: container })
```

## Returns

### `init`
- **Type** `() => void`
- **Description:** A method that allows initializing the library when your application is ready. It is recommended to run it after the DOM tree is fully loaded, for example, after `DOMContentLoaded`.

### `subscribe`
- **Type:** `(event: TrackulaInput) => void`
- **Description:** Accepts a callback function that is called when the source of interaction with the interface changes. Returns a function `stop` which, when called, will stop the execution of the provided callback function.

```typescript
function onChange(event: TrackulaInput) {
  // ...
}

const trackula = _trackula()
const { stop } = trackula.subscribe(onchange)

// You can call the stop function to halt the execution of the callback function
stop()
```

### `getInput`
- **Type** `() => TrackulaInput`
- **Description:** Returns the current type of interaction with the interface: `mouse`, `keyboard`, or `touch`

:::tip
The method also has an additional value – `initial`, which is returned if the library fails to access **window** or **document**. This may indicate that the library could have been run on the server.
:::

### `getFocus` <Badge type="warning" text="experimental" />
- **Type** `() => HTMLElement | null`
- **Description:** Returns a reference to the currently active element
