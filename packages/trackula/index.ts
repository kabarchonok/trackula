interface TrackulaReturnType {
  init: () => void

  getInput: () => CurrentInputType
  getFocus: () => HTMLElement | null
}

interface TrackulaParams {
  root?: HTMLElement | null

  subscribe?: (event: any) => any
}

export type CurrentInputType = 'initial' | 'mouse' | 'keyboard' | 'touch'

const inputMap: Record<string, string> = {
  keydown: 'keyboard',
  keyup: 'keyboard',
  mousedown: 'mouse',
  mousemove: 'mouse',
  pointerdown: 'pointer',
  pointermove: 'pointer',
  touchstart: 'touch',
  touchend: 'touch',
}

const interactiveElements = ['button', 'input', 'select', 'textarea']

export default (params?: TrackulaParams): TrackulaReturnType => {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return {
      init: () => {},

      getInput: () => 'initial',
      getFocus: () => null,
    }
  }

  const _params: TrackulaParams = params || {}

  const $root = _params.root || document.documentElement

  let _currentTimestamp = Date.now()
  let _currentInput: CurrentInputType = 'initial'
  let _currentFocus: HTMLElement | null = null

  function _updateDataAttribute(type: 'input') {
    $root.setAttribute(`data-trackula-${type}`, _currentInput)
  }

  function _isTouchInputValid(value: CurrentInputType) {
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

  const _setInput = (event: MouseEvent | KeyboardEvent | TouchEvent | PointerEvent) => {
    let value

    if (event instanceof PointerEvent) {
      value = event.pointerType === 'mouse' ? 'mouse' : 'touch' as CurrentInputType
    }
    else {
      value = inputMap[event.type] as CurrentInputType
    }

    // Avoid false keyboard focus activation
    // if the current element was engaged in another way
    if (
      value === 'keyboard'
      && _currentInput !== 'keyboard'
      && _currentFocus === event.target
      && (event as KeyboardEvent).key !== 'Tab'
    ) {
      return
    }

    // Avoid false mouse event when working with touch
    if (_isTouchInputValid(value)) {
      return
    }

    _currentInput = value
    if (_params.subscribe) {
      _params.subscribe(_currentInput)
    }

    if (event.target && _isElementInteractive(event.target)) {
      _currentFocus = event.target as HTMLElement
    }

    _updateDataAttribute('input')
  }

  const _setFocus = (event: FocusEvent) => {
    if (!event.isTrusted) {
      return
    }

    _currentFocus = event.target as HTMLElement
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
    _updateDataAttribute('input')

    _addEventListeners()
  }

  return {
    init: () => _init(),

    getInput: () => _currentInput,
    getFocus: () => _currentFocus,
  }
}
