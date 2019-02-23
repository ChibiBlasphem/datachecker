import checkerDescriptions from './checkers'
import { createChecker, composeCheckers, isChecker, Checker, AnyChecker, CheckError, Dictionary, Predicate, AnyPredicate, CheckerDescription } from './create-checker'
import { isLiteralObject } from './utils';

const DataChecker = {
  get string() {
    return checkerDescriptions.string()
  },
  get number() {
    return checkerDescriptions.number()
  },
  get boolean() {
    return checkerDescriptions.boolean()
  },
  get function() {
    return checkerDescriptions.function()
  },
  get any() {
    return checkerDescriptions.any()
  },

  oneof(...typeCheckers: Checker<any, any>[]) {
    return checkerDescriptions.oneof(...typeCheckers)
  },

  array(typeChecker: Checker<any, any> = checkerDescriptions.any()) {
    return checkerDescriptions.array(typeChecker)
  },

  instanceof(Class: Function) {
    return checkerDescriptions.instanceof(Class)
  },

  shape(checkerShape: Dictionary<any>) {
    return checkerDescriptions.shape(checkerShape)
  },

  dictionary(typeChecker: Checker<any, any> = checkerDescriptions.any()) {
    return checkerDescriptions.dictionary(typeChecker)
  },

  check(typeOrObject: Checker<any, any> | Dictionary<Checker<any, any>>, value: any): true | CheckError[] {
    if (isChecker(typeOrObject)) {
      return typeOrObject.check(value)
    }

    let errors: CheckError[] = []

    if (!isLiteralObject(value)) {
      return [{
        key: '',
        message: 'none',
        value
      }]
    }

    return errors.length > 0 ? errors : true
  },

  formatError(withDescription: boolean = false, { message, checker, key, value }: CheckError) {
    let errorMessage = ''
    
    switch (message) {
      case 'format': {
        const checkerName = checker && checker.name || ''
        errorMessage += `Expected ${checkerName} for prop \`${key}\` got: ${JSON.stringify(value)}`
        break
      }
      case 'required': {
        errorMessage += `prop \`${key}\` is required`
        break
      }
      case 'non_nullable': {
        errorMessage += `prop \`${key}\` is non nullable`
        break
      }
      case 'unknown_property': {
        errorMessage += `Unknown prop \`${value}\` in ${key ? key : 'root object'}`
        break
      }
      default:
        throw new Error('Unknown error')
    }

    let printableMessage = errorMessage
    if (withDescription && checker && checker.description) {
      printableMessage += '\n'
      printableMessage += checker.description
        .split('\n')
        .map(line => `  ${line}`)
        .join('\n')
    }
    return printableMessage
  }
}

export default DataChecker
export {
  createChecker,
  composeCheckers,
  Checker,
  AnyChecker,
  CheckError,
  Dictionary,
  Predicate,
  AnyPredicate,
  CheckerDescription
}