# Reference

## Parameters

### `root?`

- **Type:** `HTMLElement | null`
- **Default:** `document.documentElement`
- **Description:** A container element where interactions will be tracked.
If not provided, the entire HTML document (`document.documentElement`) will be used by default.

:::warning
Make sure you use the `getElementById` method instead of `querySelector` for the library to work correctly.
:::

```typescript
const container = document.getElementById('container')

trackula({ root: container })
```

### `subscribe?`
- **Type:** `(event: TrackulaInput) => void`
- **Description:** A callback function that gets triggered whenever an interaction event occurs. The event parameter provides information about the interaction.

```typescript
function onChange(event: TrackulaInput) {
  // ...
}

trackula({ subscribe: onChange })
```

## Returns

### `init`
- **Type** `() => void`
- **Description:** A method that allows initializing the library when your application is ready. It is recommended to run it after the DOM tree is fully loaded, for example, after `DOMContentLoaded`.

### `getInput`
- **Type** `() => TrackulaInput`
- **Description:** Returns the current type of interaction with the interface: `mouse`, `keyboard`, or `touch`

:::tip
The method also has an additional value – `initial`, which is returned if the library fails to access **window** or **document**. This may indicate that the library could have been run on the server.
:::

### `getFocus` <Badge type="warning" text="experimental" />
- **Type** `() => HTMLElement | null`
- **Description:** Returns a reference to the currently active element
