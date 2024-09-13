interface TrackulaReturnType {
  init: () => void

  getInput: () => TrackulaInput
  getFocus: () => HTMLElement | null
}

interface TrackulaParams {
  /**
   * A container for tracking interactions.
   * If not set, the HTML tag will be used.
   *
   * @type {(HTMLElement | null)}
   * @default document.documentElement
   */
  root?: HTMLElement | null

  /**
   * A callback function that is invoked when any event fires.
   *
   * @param {TrackulaInput} event - The event triggering the callback.
   */
  subscribe?: (event: TrackulaInput) => void
}

type TrackulaTrackedEvent = MouseEvent | KeyboardEvent | TouchEvent | PointerEvent

type TrackulaInput = 'initial' | 'mouse' | 'keyboard' | 'touch'

const inputMap: Record<string, Exclude<TrackulaInput, 'initial'>> = {
  keydown: 'keyboard',
  keyup: 'keyboard',
  mousedown: 'mouse',
  mousemove: 'mouse',
  touchstart: 'touch',
  touchend: 'touch',
}

const interactiveElements = ['button', 'input', 'select', 'textarea']

export default (params?: TrackulaParams): TrackulaReturnType => {
  console.debug('[trackula] [debug] initialization...')

  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return {
      init: () => {},

      getInput: () => 'initial',
      getFocus: () => null,
    }
  }

  const _params: TrackulaParams = params || {}

  const $root = _params.root || document.documentElement
  if (!($root instanceof HTMLElement)) {
    console.error('[trackula] [error] the root element is not an HTMLElement')
  }

  let _currentTimestamp = Date.now()
  let _currentInput: TrackulaInput = 'initial'
  let _currentFocus: HTMLElement | null = null

  function _updateInputDataAttribute() {
    $root.setAttribute(`data-trackula-input`, _currentInput)
  }

  function _isTouchInputValid(value: TrackulaInput) {
    const timestamp = Date.now()

    const touchIsValid
        = value === 'mouse'
        && _currentInput === 'touch'
        && timestamp - _currentTimestamp < 200

    _currentTimestamp = timestamp

    return touchIsValid
  }

  function _isElementInteractive(target: EventTarget) {
    return interactiveElements.includes((target as HTMLElement).nodeName)
  }

  function _getValueByEvent(event: TrackulaTrackedEvent): TrackulaInput {
    if (event instanceof PointerEvent) {
      return event.pointerType === 'mouse' ? 'mouse' : 'touch'
    }

    // TODO: review return
    return inputMap[event.type] || 'initial'
  }

  const _setFocus = (event: KeyboardEvent | FocusEvent) => {
    if (!event.isTrusted) {
      return
    }

    _currentFocus = event.target as HTMLElement

    console.debug(`[trackula] [debug] focus was changed to ${_currentFocus.nodeName.toLowerCase()}`)
  }

  const _setInput = (event: TrackulaTrackedEvent) => {
    const value = _getValueByEvent(event)

    // Avoid false keyboard focus activation
    // if the current element was engaged in another way
    if (
      event instanceof KeyboardEvent
      && event.key !== 'Tab'
      && _currentInput !== 'keyboard'
      && _currentFocus === event.target
    ) {
      return
    }

    if (
      event instanceof KeyboardEvent
      && (event.target && _isElementInteractive(event.target))
    ) {
      _setFocus(event)
    }

    // Avoid false mouse event when working with touch
    if (_isTouchInputValid(value)) {
      return
    }

    if (_currentInput !== value) {
      _currentInput = value
      _updateInputDataAttribute()

      console.debug(`[trackula] [debug] input type was changed to ${_currentInput}`)

      if (_params.subscribe) {
        _params.subscribe(_currentInput)
      }
    }
  }

  const _addEventListeners = () => {
    $root.addEventListener('keydown', _setInput, true)
    $root.addEventListener('keyup', _setInput, true)

    $root.addEventListener('focusin', _setFocus, true)

    if ('PointerEvent' in window) {
      $root.addEventListener('pointerdown', _setInput, true)
    }
    else {
      $root.addEventListener('mousedown', _setInput, true)

      if ('touchstart' in window) {
        $root.addEventListener('touchstart', _setInput, true)
        $root.addEventListener('touchend', _setInput, true)
      }
    }
  }

  const _init = () => {
    _updateInputDataAttribute()

    _addEventListeners()

    console.debug('[trackula] [debug] initialized.')
  }

  return {
    init: () => _init(),

    getInput: () => _currentInput,
    getFocus: () => _currentFocus,
  }
}
