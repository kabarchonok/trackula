import _trackula from 'trackula'

const $app = document.getElementById('app')
const $hint = document.getElementById('hint')

const trackula = _trackula({ root: $app })
trackula.init()
trackula.subscribe(onChange)

function onChange({ input }) {
  $hint.textContent = `You are now using a ${input}`
}
