import _trackula from 'trackula'

const $app = document.getElementById('app')
const $hint = document.getElementById('hint')

const trackula = _trackula({ root: $app, subscribe: onChange })
trackula.init()

function onChange(inputType) {
  $hint.textContent = `You are now using a ${inputType}`
}
