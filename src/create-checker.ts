export type Dictionary<T> = { [k:string]: T }
export type Predicate<T> = (checker: Checker<any>, value: any) => boolean | CheckError[]

export type CheckerDescription<T, K = {}> = {
  predicate: Predicate<T>,
  options: CheckerOptions<K>
}

type CheckerOptions<T extends Dictionary<any>> = {
  name: string | (() => string),
  description?: string | ((instanceDescription: string) => string),
} & T

export type CheckError = {
  key: string,
  message: string,
  value: any,
  checker?: Checker<any>,
}

type BaseChecker<T, K = {}> = {
  required: boolean,
  nullable: boolean,
  name: string,
  options: CheckerOptions<K>,
}

type InternalChecker<T, K = {}> = BaseChecker<T, K> & {
  predicate: Predicate<T>,
  description: CheckerInstanceDescription<T, K>,
}

type CheckerInstanceDescription<T, K> = string | ((checker: Checker<T, K>) => string)

export type Checker<T, K = {}> = BaseChecker<T, K> & {
  $$typeof: string,
  isRequired: Checker<T, K>,
  isNullable: Checker<T, K>,
  setDescription(description: CheckerInstanceDescription<T, K>): Checker<T, K>,
  check(value: any): true | CheckError[],
  description: string,
}

export function isChecker<T>(value: any): value is Checker<T> {
  return value && value.$$typeof === 'checker'
}

export function toChecker<T, K>(checkerDescription: CheckerDescription<T, K>): Checker<T, K> {
  return createChecker(checkerDescription.predicate, checkerDescription.options)
}

export function createChecker<T, K>(predicate: Predicate<T>, options: CheckerOptions<K>): Checker<T, K> {
  const internalChecker: InternalChecker<T, K> = {
    name: '',
    required: false,
    nullable: false,
    description: '',
    predicate,
    options
  }

  const checker: Checker<T, K> = {
    get $$typeof() {
      return 'checker'
    },
    get isRequired() {
      internalChecker.required = true
      return this
    },
    get isNullable() {
      internalChecker.nullable = true
      return this
    },
    get name() {
      const { name } = internalChecker.options
      let retName = typeof name === 'function' ? name() : name
      if (internalChecker.nullable) {
        retName += '|null'
      }
      return retName
    },
    get description() {
      const { description: checkerDescription } = internalChecker.options
      const { description: instanceDescription } = internalChecker

      const instanceDescriptionValue = typeof instanceDescription === 'function'
        ? instanceDescription(checker)
        : instanceDescription

      if (!checkerDescription) {
        return instanceDescriptionValue
      }

      return typeof checkerDescription === 'function'
        ? checkerDescription(instanceDescriptionValue)
        : (instanceDescriptionValue
          ? `${checkerDescription}\n${instanceDescriptionValue}`
          : checkerDescription)
    },
    get required() {
      return internalChecker.required
    },
    get nullable() {
      return internalChecker.nullable
    },
    get options() {
      return { ...internalChecker.options }
    },
    setDescription(description: string) {
      internalChecker.description = description
      return this
    },
    check(value: any) {
      const preCheck = preCheckValue(internalChecker.required, internalChecker.nullable, value)

      if (preCheck === true) return true
      if (preCheck === false) {
        return [{
          key: '',
          message: value === null ? 'non_nullable' : 'required',
          checker,
          value,
        }]
      }

      const predicateResult = internalChecker.predicate(checker, value)
      if (predicateResult === false) {
        return [{
          key: '',
          message: 'format',
          checker,
          value
        }]
      }

      return predicateResult
    }
  }

  return checker
}

function preCheckValue(required: boolean, nullable: boolean, value: any): boolean | undefined {
  if (value === undefined) return !required
  if (value === null) return nullable
}