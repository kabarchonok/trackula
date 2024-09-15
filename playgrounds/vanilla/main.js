import _trackula from 'trackula'

const $app = document.querySelector('#app')
const $hint = document.querySelector('#hint')

const trackula = _trackula({ root: $app, subscribe: onChange })
trackula.init()

function onChange(inputType) {
  $hint.textContent = `You are now using a ${inputType}`
}
