/**
 * @returns An array containing the function and a flush function.
 */
function debounce(func, delay = 500) {
  let timeout
  let funcWithArgs
  return [
    (...args) => {
      clearTimeout(timeout)
      funcWithArgs = () => func.apply(this, args)
      timeout = setTimeout(() => {
        funcWithArgs()
        timeout = undefined
      }, delay)
    },
    () => {
      if (timeout) {
        clearTimeout(timeout)
        return funcWithArgs()
      }
    },
  ]
}

module.exports = {
  debounce,
}
