import { toChecker, Predicate, CheckerDescription, Checker } from '../create-checker'
import anyCheckerFn from './any'

export default (typeChecker: Checker<any, any>) => toChecker({
  predicate: ((checker, value) => {
    if (!Array.isArray(value)) return false

    const errors = value.reduce((errors, v, i) => {
      const res = typeChecker.check(v)
      if (res === true) return errors
      return {
        ...errors,
        ...res.map(error => ({
          ...error,
          key: `[${i}]${error.key}`,
        })),
      }
    }, [])

    return errors.length > 0 ? errors : true
  }) as Predicate<Array<any>>,
  options: {
    name: () => `array<${typeChecker.name}>`
  }
})