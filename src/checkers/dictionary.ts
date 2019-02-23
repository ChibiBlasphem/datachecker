import { toChecker, Predicate, Dictionary, CheckError, Checker } from '../create-checker'
import { isLiteralObject } from '../utils';

export default (typeChecker: Checker<any, any>) => toChecker({
  predicate: ((checker, value) => {
    if (!isLiteralObject(value)) return false

    const errors = Object.entries(value).reduce((errors, [k, v]) => {
      const res = typeChecker.check(v)
      
      if (res === true) return errors

      return [
        ...errors,
        ...res.map(error => ({
          ...error,
          key: `['${k}']${error.key}`
        }))
      ]
    }, [] as CheckError[])

    return errors.length > 0 ? errors : true
  }) as Predicate<Dictionary<any>>,
  options: {
    name: () => `dictionary<${typeChecker.name}>`
  }
})