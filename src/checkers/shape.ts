import { toChecker, Predicate, Dictionary, Checker, CheckError } from '../create-checker'
import { isLiteralObject } from '../utils';

export default (checkerShape: Dictionary<Checker<any, any>>) => toChecker({
  predicate: ((checker, value) => {
    if (!isLiteralObject(value)) return false

    let errors: CheckError[] = []
    errors = Object.entries(checkerShape).reduce((errors, [key, checker]) => {
      const res = checker.check(value[key])
      
      if (res === true) return errors
      
      return [
        ...errors,
        ...res.map(error => ({ ...error, key: `.${key}${error.key}` }))
      ]
    }, errors)

    errors = Object.entries(value).reduce((errors, [key]) => {
      if (key in checkerShape) {
        return errors
      }

      return [
        ...errors,
        { key: '', value: key, message: 'unknown_property' },
      ]
    }, errors)

    return errors.length > 0 ? errors : true
  }) as Predicate<Dictionary<any>>,
  options: {
    name: 'literal object',
    description(instanceDescription) {
      const entries = Object.entries(checkerShape)

      let description = entries.reduce((descriptionRows, [key, checker]) => {
        let retDescriptionRows = [...descriptionRows]

        retDescriptionRows = [...retDescriptionRows, `  - ${key}${!checker.required ? ' [optional]' : ''}: ${checker.name}`]
        if (checker.description) {
          const fieldDescription = checker.description.split('\n').map(row => `    ${row}`).join('\n')
          retDescriptionRows = [...retDescriptionRows, fieldDescription]
        }

        return retDescriptionRows
      }, instanceDescription ? [instanceDescription] : []).join('\n')

      return description
    }
  }
})